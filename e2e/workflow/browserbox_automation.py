"""
BrowserBox Playwright Automation (Python)

Pure Python automation interface for BrowserBox using Playwright without Node.js.
Bridges Python automation code to the browser-side window.browserboxAutomation API.

Usage:
    pip install playwright
    playwright install chromium
    
    from e2e.workflow.browserbox_automation import BrowserBoxAutomation
    
    automation = BrowserBoxAutomation()
    await automation.initialize()
    await automation.load_configuration("./config.zip")
    results = await automation.execute_all_scripts()
    await automation.download_all_results()
"""

import asyncio
import json
import logging
from pathlib import Path
from typing import Dict, List, Optional, Union, Any
from dataclasses import dataclass

try:
    from playwright.async_api import async_playwright, Browser, Page, Playwright
except ImportError:
    raise ImportError(
        "Playwright not found. Install with: pip install playwright && playwright install chromium"
    )


@dataclass
class ScriptInfo:
    """Information about a BrowserBox script."""
    id: str
    title: str
    filename: str
    content: str
    status: str  # 'ready', 'running', 'completed', 'error'


@dataclass
class ExecutionResult:
    """Result of script execution."""
    status: str
    output: Optional[str] = None
    error: Optional[str] = None
    execution_time: Optional[str] = None
    last_run: Optional[str] = None
    started_at: Optional[str] = None
    completed_at: Optional[str] = None


@dataclass
class ResultFile:
    """Information about a generated result file."""
    id: str
    filename: str
    script_id: str
    file_size: int
    created_at: str
    content: Optional[bytes] = None


class BrowserBoxAutomation:
    """Python interface for BrowserBox automation using Playwright."""
    
    def __init__(self, headless: bool = True, base_url: str = "http://localhost:5173"):
        """
        Initialize BrowserBox automation.
        
        Args:
            headless: Whether to run browser in headless mode
            base_url: URL where BrowserBox is running
        """
        self.headless = headless
        self.base_url = base_url
        self.playwright: Optional[Playwright] = None
        self.browser: Optional[Browser] = None
        self.page: Optional[Page] = None
        self.logger = logging.getLogger(__name__)
        
    async def initialize(self, timeout: int = 30000) -> None:
        """
        Initialize browser and navigate to BrowserBox.
        
        Args:
            timeout: Timeout in milliseconds for initialization
        """
        self.logger.info("🚀 Initializing BrowserBox automation")
        
        # Launch Playwright
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(headless=self.headless)
        self.page = await self.browser.new_page()
        
        # Navigate to BrowserBox
        await self.page.goto(self.base_url)
        
        # Wait for app to load and automation API to be available
        await self.page.wait_for_selector('[data-automation="run-all-scripts"]', timeout=timeout)
        await self.page.wait_for_function(
            "typeof window.browserboxAutomation !== 'undefined'",
            timeout=10000
        )
        
        self.logger.info("✅ BrowserBox automation initialized")
    
    async def cleanup(self) -> None:
        """Clean up browser resources."""
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()
        self.logger.info("✅ Browser resources cleaned up")
    
    async def __aenter__(self):
        """Async context manager entry."""
        await self.initialize()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit."""
        await self.cleanup()
    
    # Configuration Management
    
    async def load_configuration(self, config_path: Union[str, Path]) -> bool:
        """
        Load a configuration ZIP package.
        
        Args:
            config_path: Path to the configuration ZIP file
            
        Returns:
            True if configuration loaded successfully
        """
        config_file = Path(config_path)
        
        if not config_file.exists():
            raise FileNotFoundError(f"Configuration file not found: {config_path}")
        
        self.logger.info(f"📦 Loading configuration from {config_path}")
        
        # Click the load configuration button
        await self.page.click('[data-testid="load-configuration"]')
        
        # Upload the configuration file
        file_input = self.page.locator('[data-testid="config-file-input"]')
        await file_input.set_input_files(str(config_file.absolute()))
        
        # Wait for configuration to load using the automation API
        await self.page.wait_for_function(
            "window.browserboxAutomation && window.browserboxAutomation.getApplicationStatus().configLoaded",
            timeout=30000
        )
        
        self.logger.info("✅ Configuration loaded successfully")
        return True
    
    async def get_active_configuration(self) -> Optional[Dict[str, Any]]:
        """Get the currently active configuration."""
        return await self.page.evaluate("() => window.browserboxAutomation.getActiveConfiguration()")
    
    # Script Management
    
    async def get_all_scripts(self) -> List[ScriptInfo]:
        """Get all available scripts."""
        scripts_data = await self.page.evaluate("() => window.browserboxAutomation.getAllScripts()")
        return [ScriptInfo(**script) for script in scripts_data]
    
    async def get_script_by_id(self, script_id: str) -> Optional[ScriptInfo]:
        """Get a specific script by ID."""
        script_data = await self.page.evaluate(
            f"() => window.browserboxAutomation.getScriptById('{script_id}')"
        )
        return ScriptInfo(**script_data) if script_data else None
    
    async def execute_script(self, script_id: str) -> ExecutionResult:
        """
        Execute a specific script and wait for completion.
        
        Args:
            script_id: ID of the script to execute
            
        Returns:
            ExecutionResult with execution details
        """
        self.logger.info(f"🚀 Executing script: {script_id}")
        
        execution_data = await self.page.evaluate(f"""
            async () => {{
                try {{
                    const result = await window.browserboxAutomation.executeScript('{script_id}');
                    return result;
                }} catch (error) {{
                    return {{
                        status: 'error',
                        error: error.message
                    }};
                }}
            }}
        """)
        
        result = ExecutionResult(**execution_data)
        self.logger.info(f"✅ Script execution completed: {result.status}")
        return result
    
    async def execute_all_scripts(self) -> List[ExecutionResult]:
        """
        Execute all available scripts sequentially.
        
        Returns:
            List of ExecutionResult objects for each script
        """
        self.logger.info("🚀 Executing all scripts")
        
        # Click the run all scripts button
        await self.page.click('[data-testid="run-all-scripts"]')
        
        # Use the automation API to execute and wait for all scripts
        executions_data = await self.page.evaluate("""
            async () => {
                try {
                    const results = await window.browserboxAutomation.executeAllScripts();
                    return results;
                } catch (error) {
                    return [{
                        status: 'error',
                        error: error.message
                    }];
                }
            }
        """)
        
        results = [ExecutionResult(**execution) for execution in executions_data]
        
        # Log summary
        successful = len([r for r in results if r.status == 'completed'])
        failed = len([r for r in results if r.status == 'error'])
        self.logger.info(f"✅ All scripts completed: {successful} successful, {failed} failed")
        
        return results
    
    async def wait_for_execution(self, script_id: str, timeout: int = 120000) -> ExecutionResult:
        """
        Wait for a specific script execution to complete.
        
        Args:
            script_id: ID of the script to wait for
            timeout: Timeout in milliseconds
            
        Returns:
            ExecutionResult when script completes
        """
        self.logger.info(f"⏳ Waiting for script execution: {script_id}")
        
        execution_data = await self.page.evaluate(f"""
            async () => {{
                try {{
                    const result = await window.browserboxAutomation.waitForExecution('{script_id}', {timeout});
                    return result;
                }} catch (error) {{
                    return {{
                        status: 'timeout',
                        error: error.message
                    }};
                }}
            }}
        """)
        
        return ExecutionResult(**execution_data)
    
    async def get_execution_status(self, script_id: str) -> str:
        """Get the current execution status of a script."""
        return await self.page.evaluate(
            f"() => window.browserboxAutomation.getExecutionStatus('{script_id}')"
        )
    
    # Result Management
    
    async def get_all_results(self) -> List[ResultFile]:
        """Get all generated result files."""
        results_data = await self.page.evaluate("() => window.browserboxAutomation.getAllResults()")
        return [ResultFile(**result) for result in results_data]
    
    async def get_results_by_script(self, script_id: str) -> List[ResultFile]:
        """Get results generated by a specific script."""
        results_data = await self.page.evaluate(
            f"() => window.browserboxAutomation.getResultsByScript('{script_id}')"
        )
        return [ResultFile(**result) for result in results_data]
    
    async def download_result(self, result_id: str) -> None:
        """Download a specific result file."""
        await self.page.evaluate(f"""
            async () => {{
                await window.browserboxAutomation.downloadResult('{result_id}');
            }}
        """)
    
    async def download_all_results(self, download_path: Optional[Union[str, Path]] = None) -> None:
        """
        Download all result files.
        
        Args:
            download_path: Directory to save files (optional)
        """
        if download_path:
            download_dir = Path(download_path).resolve()
            download_dir.mkdir(parents=True, exist_ok=True)
            
            # Set up download behavior
            await self.page._client.send('Page.setDownloadBehavior', {
                'behavior': 'allow',
                'downloadPath': str(download_dir)
            })
        
        self.logger.info("💾 Downloading all results")
        
        # Click the download all button
        await self.page.click('[data-testid="download-all-results"]')
        
        # Small delay for downloads to initialize
        await asyncio.sleep(2)
        
        self.logger.info("✅ Download initiated")
    
    async def download_individual_results(self, download_path: Optional[Union[str, Path]] = None) -> None:
        """
        Download all result files individually (alternative to batch download).
        
        Args:
            download_path: Directory to save files (optional)
        """
        if download_path:
            download_dir = Path(download_path).resolve()
            download_dir.mkdir(parents=True, exist_ok=True)
            
            await self.page._client.send('Page.setDownloadBehavior', {
                'behavior': 'allow',
                'downloadPath': str(download_dir)
            })
        
        self.logger.info("💾 Downloading individual results")
        
        # Get all download buttons
        download_buttons = self.page.locator('[data-testid="download-result"]')
        count = await download_buttons.count()
        
        for i in range(count):
            button = download_buttons.nth(i)
            result_id = await button.get_attribute('data-result-id')
            self.logger.info(f"Downloading result: {result_id}")
            
            await button.click()
            await asyncio.sleep(0.5)  # Small delay between downloads
        
        self.logger.info("✅ Individual downloads completed")
    
    # Utility Functions
    
    async def wait_for_condition(self, condition: str, timeout: int = 30000, message: str = "Condition") -> bool:
        """
        Wait for a custom JavaScript condition to be true.
        
        Args:
            condition: JavaScript expression that should evaluate to true
            timeout: Timeout in milliseconds
            message: Description of what we're waiting for
            
        Returns:
            True when condition is met
        """
        self.logger.info(f"⏳ Waiting for: {message}")
        
        await self.page.wait_for_function(condition, timeout=timeout)
        self.logger.info(f"✅ Condition met: {message}")
        return True
    
    async def get_application_status(self) -> Dict[str, Any]:
        """Get current application status."""
        return await self.page.evaluate("() => window.browserboxAutomation.getApplicationStatus()")
    
    async def get_execution_logs(self) -> List[Dict[str, Any]]:
        """Get detailed execution logs for all scripts."""
        scripts = await self.get_all_scripts()
        logs = []
        
        for script in scripts:
            execution_data = await self.page.evaluate(f"""
                () => {{
                    const execution = window.browserboxAutomation.getExecution('{script.id}');
                    return execution || {{}};
                }}
            """)
            
            logs.append({
                'script_id': script.id,
                'title': script.title,
                'filename': script.filename,
                'status': script.status,
                **execution_data
            })
        
        return logs
    
    async def save_execution_report(self, logs: List[Dict[str, Any]], output_path: Union[str, Path] = "./execution-report.json") -> None:
        """
        Save execution report to JSON file.
        
        Args:
            logs: Execution logs from get_execution_logs()
            output_path: Path to save the report
        """
        report_path = Path(output_path)
        
        report = {
            "timestamp": asyncio.get_event_loop().time(),
            "summary": {
                "total_scripts": len(logs),
                "successful": len([log for log in logs if log.get('status') == 'completed']),
                "failed": len([log for log in logs if log.get('status') == 'error']),
                "other": len([log for log in logs if log.get('status') not in ['completed', 'error']])
            },
            "executions": logs
        }
        
        with report_path.open('w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        self.logger.info(f"📊 Execution report saved to {report_path}")


# Example usage and helper functions

async def simple_automation_example():
    """Simple example of using the automation API."""
    async with BrowserBoxAutomation(headless=False) as automation:
        # Check application status
        status = await automation.get_application_status()
        print(f"📊 Application Status: {status}")
        
        # Get available scripts
        scripts = await automation.get_all_scripts()
        print(f"📝 Found {len(scripts)} scripts")
        
        if scripts:
            # Execute all scripts
            results = await automation.execute_all_scripts()
            
            # Get generated results
            result_files = await automation.get_all_results()
            print(f"📁 Generated {len(result_files)} result files")
            
            # Download results
            if result_files:
                await automation.download_all_results("./downloads")
            
            # Generate report
            logs = await automation.get_execution_logs()
            await automation.save_execution_report(logs)


if __name__ == "__main__":
    # Configure logging
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    
    # Run example
    asyncio.run(simple_automation_example())