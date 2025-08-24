"""
BrowserBox Automation Test Suite

Comprehensive test suite for BrowserBox automation using pytest and Playwright.
Tests both individual functionality and complete workflows.

Usage:
    # Install dependencies
    pip install -r e2e/workflow/requirements.txt
    
    # Run all tests
    pytest e2e/workflow/test_automation.py -v
    
    # Run with browser visible
    pytest e2e/workflow/test_automation.py -v --headless=false
    
    # Run specific test categories
    pytest e2e/workflow/test_automation.py -v -k "test_basic"
    pytest e2e/workflow/test_automation.py -v -k "test_workflow"
    pytest e2e/workflow/test_automation.py -v -k "test_config"
    
    # Generate coverage report
    pytest e2e/workflow/test_automation.py --cov=e2e/workflow
"""

import asyncio
import os
import logging
import tempfile
from pathlib import Path
from typing import Generator, Optional, AsyncGenerator
import zipfile

import pytest
import pytest_asyncio

from browserbox_automation import BrowserBoxAutomation, ScriptInfo, ExecutionResult, ResultFile


# Test configuration (override with BROWSERBOX_BASE_URL)
BASE_URL = os.environ.get("BROWSERBOX_BASE_URL", os.environ.get("BROWSERBOX_URL", "http://localhost:8080"))
DEFAULT_TIMEOUT = int(os.environ.get("BROWSERBOX_INIT_TIMEOUT", "60000"))  # Allow override for large bundle load times

# Note: Removed deprecated/invalid pytest_asyncio.fixtures.DEFAULT_SCOPE assignment.


@pytest.fixture(scope="session")
def event_loop() -> Generator[asyncio.AbstractEventLoop, None, None]:
    """Create event loop for the test session."""
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()


@pytest.fixture
def headless(request) -> bool:
    """Control headless mode via command line option."""
    return getattr(request.config.option, 'headless', True)


@pytest_asyncio.fixture
async def automation(headless: bool) -> AsyncGenerator[BrowserBoxAutomation, None]:
    """Create and initialize BrowserBox automation instance."""
    automation = BrowserBoxAutomation(headless=headless, base_url=BASE_URL)
    await automation.initialize(timeout=DEFAULT_TIMEOUT)
    
    yield automation
    
    await automation.cleanup()


@pytest.fixture
def sample_config_zip(tmp_path: Path) -> Path:
    """Create a sample configuration ZIP file for testing."""
    config_dir = tmp_path / "test-config"
    config_dir.mkdir()
    
    # Create sample script
    script_content = """
import pandas as pd
import numpy as np

# Generate sample data
data = {
    'id': range(1, 101),
    'value': np.random.randn(100),
    'category': ['A', 'B', 'C'] * 33 + ['A']
}

df = pd.DataFrame(data)

# Save as CSV
df.to_csv('sample_data.csv', index=False)

# Create summary
summary = df.groupby('category').agg({
    'value': ['mean', 'std', 'count']
}).round(3)

print("Data generated successfully!")
print(f"Total rows: {len(df)}")
print("Summary by category:")
print(summary)
    """.strip()
    
    script_file = config_dir / "generate_data.py"
    script_file.write_text(script_content)
    
    # Create config metadata
    config_json = {
        "name": "test-automation-config",
        "version": "1.0.0",
        "description": "Test configuration for automation",
        "scripts": [
            {
                "id": "generate_data",
                "title": "Generate Test Data",
                "filename": "generate_data.py",
                "description": "Generate sample dataset for testing"
            }
        ]
    }
    
    import json
    config_file = config_dir / "config.json"
    config_file.write_text(json.dumps(config_json, indent=2))
    
    # Create ZIP file
    zip_path = tmp_path / "test-config.zip"
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file_path in config_dir.rglob('*'):
            if file_path.is_file():
                arcname = file_path.relative_to(config_dir)
                zipf.write(file_path, arcname)
    
    return zip_path


class TestBasicFunctionality:
    """Test basic automation functionality."""
    
    async def test_initialization(self, automation: BrowserBoxAutomation):
        """Test that automation initializes correctly."""
        # Check that page is loaded
        assert automation.page is not None
        assert automation.browser is not None
        
        # Check that automation API is available
        api_available = await automation.page.evaluate("typeof window.browserboxAutomation !== 'undefined'")
        assert api_available, "BrowserBox automation API should be available"
    
    async def test_application_status(self, automation: BrowserBoxAutomation):
        """Test getting application status."""
        status = await automation.get_application_status()
        
        assert isinstance(status, dict)
        assert 'ready' in status
        assert 'scriptsLoaded' in status
        assert status['ready'] is True
    
    async def test_get_scripts(self, automation: BrowserBoxAutomation):
        """Test getting available scripts."""
        scripts = await automation.get_all_scripts()
        
        assert isinstance(scripts, list)
        # Scripts should be ScriptInfo objects or convertible to them
        for script in scripts:
            assert hasattr(script, 'id')
            assert hasattr(script, 'title')
            assert hasattr(script, 'filename')
            assert hasattr(script, 'status')
    
    async def test_get_results(self, automation: BrowserBoxAutomation):
        """Test getting available results."""
        results = await automation.get_all_results()
        
        assert isinstance(results, list)
        # Results should be ResultFile objects or convertible to them
        for result in results:
            assert hasattr(result, 'id')
            assert hasattr(result, 'filename')
            assert hasattr(result, 'file_size')


class TestConfigurationManagement:
    """Test configuration loading and management."""
    
    async def test_load_valid_config(self, automation: BrowserBoxAutomation, sample_config_zip: Path):
        """Test loading a valid configuration package."""
        # Load configuration
        success = await automation.load_configuration(sample_config_zip)
        assert success, "Configuration loading should succeed"
        
        # Check that configuration is active
        config = await automation.get_active_configuration()
        assert config is not None, "Active configuration should not be None"
        
        # Check that scripts are available
        status = await automation.get_application_status()
        assert status.get('configLoaded', False), "Config should be marked as loaded"
    
    async def test_load_nonexistent_config(self, automation: BrowserBoxAutomation):
        """Test loading a non-existent configuration file."""
        nonexistent_path = Path("/nonexistent/config.zip")
        
        with pytest.raises(FileNotFoundError):
            await automation.load_configuration(nonexistent_path)


class TestScriptExecution:
    """Test script execution functionality."""
    
    async def test_script_execution_with_config(self, automation: BrowserBoxAutomation, sample_config_zip: Path):
        """Test executing scripts after loading configuration."""
        # Load configuration
        await automation.load_configuration(sample_config_zip)
        
        # Get available scripts
        scripts = await automation.get_all_scripts()
        
        if scripts:
            # Execute first script
            script = scripts[0]
            result = await automation.execute_script(script.id)
            
            assert isinstance(result, ExecutionResult)
            assert result.status in ['completed', 'error', 'running']
            
            if result.status == 'completed':
                assert result.output is not None
            elif result.status == 'error':
                assert result.error is not None
    
    async def test_execute_all_scripts(self, automation: BrowserBoxAutomation, sample_config_zip: Path):
        """Test executing all available scripts."""
        # Load configuration
        await automation.load_configuration(sample_config_zip)
        
        # Execute all scripts
        results = await automation.execute_all_scripts()
        
        assert isinstance(results, list)
        
        if results:
            for result in results:
                assert isinstance(result, ExecutionResult)
                assert result.status in ['completed', 'error', 'timeout']
    
    async def test_wait_for_execution(self, automation: BrowserBoxAutomation, sample_config_zip: Path):
        """Test waiting for script execution completion."""
        # Load configuration
        await automation.load_configuration(sample_config_zip)
        
        scripts = await automation.get_all_scripts()
        
        if scripts:
            script = scripts[0]
            
            # Start execution (don't await)
            asyncio.create_task(automation.execute_script(script.id))
            
            # Wait for completion
            result = await automation.wait_for_execution(script.id, timeout=60000)
            
            assert isinstance(result, ExecutionResult)
            assert result.status in ['completed', 'error', 'timeout']


class TestResultManagement:
    """Test result collection and download functionality."""
    
    async def test_result_collection_after_execution(self, automation: BrowserBoxAutomation, sample_config_zip: Path):
        """Test collecting results after script execution."""
        # Load configuration and execute scripts
        await automation.load_configuration(sample_config_zip)
        await automation.execute_all_scripts()
        
        # Collect results
        results = await automation.get_all_results()
        
        # Should have at least some results if scripts succeeded
        if results:
            for result in results:
                assert isinstance(result, ResultFile)
                assert result.filename
                assert result.file_size >= 0
                assert result.id
    
    async def test_download_functionality(self, automation: BrowserBoxAutomation, sample_config_zip: Path, tmp_path: Path):
        """Test result download functionality."""
        # Load configuration and execute scripts
        await automation.load_configuration(sample_config_zip)
        await automation.execute_all_scripts()
        
        # Get results
        results = await automation.get_all_results()
        
        if results:
            download_dir = tmp_path / "test-downloads"
            
            # Test download all
            await automation.download_all_results(download_dir)
            
            # Verify download directory was created
            assert download_dir.exists(), "Download directory should be created"


class TestWorkflowIntegration:
    """Test complete workflow scenarios."""
    
    async def test_complete_workflow(self, automation: BrowserBoxAutomation, sample_config_zip: Path, tmp_path: Path):
        """Test complete automation workflow from config to results."""
        download_dir = tmp_path / "workflow-results"
        
        # Step 1: Load configuration
        success = await automation.load_configuration(sample_config_zip)
        assert success
        
        # Step 2: Verify scripts are available
        scripts = await automation.get_all_scripts()
        assert len(scripts) > 0, "Should have scripts after loading config"
        
        # Step 3: Execute all scripts
        execution_results = await automation.execute_all_scripts()
        assert len(execution_results) > 0, "Should have execution results"
        
        # Step 4: Collect results
        result_files = await automation.get_all_results()
        
        # Step 5: Generate execution logs
        logs = await automation.get_execution_logs()
        assert isinstance(logs, list)
        
        # Step 6: Save execution report
        report_path = tmp_path / "test-report.json"
        await automation.save_execution_report(logs, report_path)
        assert report_path.exists(), "Report file should be created"
        
        # Step 7: Download results if available
        if result_files:
            await automation.download_all_results(download_dir)

    async def test_demo_config_workflow(self, automation: BrowserBoxAutomation, tmp_path: Path):
        """Run the demo-config.zip and assert expected outputs are produced.
        Requires that the app is running and temp/demo-config.zip exists.
        """
        # Resolve potential locations: (a) repo-root/temp/demo-config.zip, (b) current-dir/temp/demo-config.zip
        current_dir = Path(__file__).resolve().parent
        # project root = ../../ from this file (e2e/workflow -> e2e -> root)
        project_root = current_dir.parent.parent
        candidate_paths = [
            project_root / 'temp' / 'demo-config.zip',
            current_dir / 'temp' / 'demo-config.zip'
        ]
        demo_zip = next((p for p in candidate_paths if p.exists()), None)
        if not demo_zip:
            pytest.skip("demo-config.zip not found in temp/ at project root or local e2e/workflow/temp/; generate it before running this test")

        # Load configuration and execute complete workflow (scripts + schema validations)
        await automation.load_configuration(demo_zip)
        workflow_results = await automation.execute_complete_workflow()
        
        # Combine all results for error checking
        all_results = workflow_results['scripts'] + workflow_results['validations']
        assert isinstance(all_results, list)

        # Gather comprehensive execution diagnostics
        logs = await automation.get_execution_logs()
        console_errors = await automation.get_console_errors()
        page_errors = await automation.get_page_errors()
        pyodide_errors = await automation.get_pyodide_errors()
        all_errors = await automation.get_all_errors()

        # Identify failing scripts via explicit status or presence of error field
        failing = [
            {
                'script_id': l.get('script_id'),
                'title': l.get('title'),
                'status': l.get('status'),
                'error': l.get('error'),
                'output_excerpt': (l.get('output', '') or '')[:400]
            }
            for l in logs
            if l.get('status') == 'error' or l.get('error')
        ]

        # Check for any errors that indicate script/validation failures
        has_errors = (
            failing or 
            console_errors or 
            page_errors or 
            pyodide_errors or
            any(l.get('status') == 'error' for l in logs) or
            any(r.status == 'error' for r in all_results)
        )

        if has_errors:
            detail = {
                'failing_scripts': failing,
                'console_errors': console_errors[:20],  # cap noise
                'page_errors': page_errors[:10],
                'pyodide_errors': pyodide_errors[:10],
                'error_summary': all_errors
            }
            assert False, f"Demo config workflow had errors: {detail}"

        # Collect results and verify key artifacts exist
        files = await automation.get_all_results()
        names = {r.filename for r in files}
        expected = {
            'data_visualization_report.html',
            'visualization_report.md',
            'linear_regression_report.html',
            'linear_regression_summary.md',
            'decision_tree_report.html',
            'decision_tree_summary.md',
            'numeric_schema_report.html'
        }
        missing = expected - names
        assert not missing, f"Missing expected outputs: {sorted(missing)}"
    
    async def test_workflow_without_config(self, automation: BrowserBoxAutomation):
        """Test workflow with existing scripts (no config loading)."""
        # Get any existing scripts
        scripts = await automation.get_all_scripts()
        
        if scripts:
            # Execute available scripts
            results = await automation.execute_all_scripts()
            assert isinstance(results, list)
            
            # Collect any existing results
            result_files = await automation.get_all_results()
            assert isinstance(result_files, list)
        else:
            # No scripts available - this is valid
            assert len(scripts) == 0


class TestErrorHandling:
    """Test error handling and edge cases."""
    
    async def test_invalid_script_id(self, automation: BrowserBoxAutomation):
        """Test handling of invalid script ID."""
        # Try to get non-existent script
        script = await automation.get_script_by_id("non-existent-id")
        assert script is None, "Non-existent script should return None"
    
    async def test_execution_timeout(self, automation: BrowserBoxAutomation):
        """Test handling of execution timeouts."""
        # This test would need a script that runs longer than timeout
        # For now, just test that the timeout parameter is handled
        scripts = await automation.get_all_scripts()
        
        if scripts:
            script_id = scripts[0].id
            
            # Test with very short timeout (should handle gracefully)
            result = await automation.wait_for_execution(script_id, timeout=1)  # 1ms timeout
            assert isinstance(result, ExecutionResult)


# Pytest configuration
def pytest_addoption(parser):
    """Add custom pytest options."""
    parser.addoption(
        "--headless",
        action="store",
        default="true",
        help="Run browser in headless mode (true/false)"
    )


def pytest_configure(config):
    """Configure pytest."""
    # Convert headless string to boolean
    headless_str = config.getoption("--headless").lower()
    config.option.headless = headless_str in ("true", "1", "yes", "on")


# Test markers for categorizing tests
pytestmark = [
    pytest.mark.asyncio,
    pytest.mark.integration
]


if __name__ == "__main__":
    # Allow running tests directly
    pytest.main([__file__, "-v"])
