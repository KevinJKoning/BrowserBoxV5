# BrowserBox Workflow Automation

> **📖 [← Back to E2E Testing Overview](../README.md)** | **🔧 [Individual Script Testing](../individual/README.md)**

Comprehensive automation tools for complete BrowserBox workflows using Microsoft Playwright **without Node.js**. This enables continuous development and testing workflows where configuration changes can be automatically tested in the Pyodide environment using pure Python.

## Overview

The automation system provides:

- **Script Execution**: Programmatically run Python scripts in Pyodide
- **Configuration Loading**: Automatically load configuration packages
- **Result Collection**: Download and analyze generated files
- **Status Monitoring**: Track execution progress and errors
- **Continuous Testing**: Automated validation of script changes
- **Python-Only**: No Node.js dependency required

## Files

- `browserbox_automation.py` - Python automation class (main interface)
- `workflow_automation.py` - Complete workflow automation script
- `test_automation.py` - Pytest test suite for comprehensive testing
- `requirements.txt` - Python dependencies
- `README.md` - This documentation

## Quick Start

### Prerequisites (Python-Only)

```bash
# Install Python dependencies
pip install -r e2e/workflow/requirements.txt

# Install browser binaries (one-time setup)
playwright install chromium
```

**That's it!** No Node.js installation required.

### Basic Usage

#### Option 1: Complete Workflow Script (Recommended)

```bash
# Run complete automation workflow
python e2e/workflow/workflow_automation.py --config config.zip --output ./results

# With browser visible for debugging
python e2e/workflow/workflow_automation.py --config config.zip --output ./results --headless=false

# Custom timeout and URL
python e2e/workflow/workflow_automation.py \
    --config config.zip \
    --output ./results \
    --url http://localhost:5173 \
    --timeout 300
```

#### Option 2: Using the Automation Class

```python
from e2e.workflow.browserbox_automation import BrowserBoxAutomation

async def main():
    async with BrowserBoxAutomation(headless=False) as automation:
        # Load configuration
        await automation.load_configuration("./config.zip")
        
        # Execute all scripts
        results = await automation.execute_all_scripts()
        
        # Download results
        await automation.download_all_results("./downloads")
        
        # Generate report
        logs = await automation.get_execution_logs()
        await automation.save_execution_report(logs)

import asyncio
asyncio.run(main())
```

#### Option 3: Using Pytest Test Suite

```bash
# Run all tests
pytest e2e/workflow/test_automation.py -v

# Run with browser visible
pytest e2e/workflow/test_automation.py -v --headless=false

# Run specific test categories
pytest e2e/workflow/test_automation.py -v -k "test_workflow"
pytest e2e/workflow/test_automation.py -v -k "test_config"

# Generate coverage report
pytest e2e/workflow/test_automation.py --cov=e2e/workflow --cov-report=html
```

### Example Development Flow

```python
# e2e/workflow/my_automation.py
import asyncio
from pathlib import Path
from e2e.workflow.browserbox_automation import BrowserBoxAutomation

async def development_flow():
    """Example: Complete development workflow."""
    
    async with BrowserBoxAutomation(headless=False) as automation:
        
        # 1. Load your configuration package
        config_path = Path("./my-analysis-config.zip")
        if config_path.exists():
            await automation.load_configuration(config_path)
            print("✅ Configuration loaded")
        
        # 2. Execute all scripts in the configuration
        print("🚀 Executing scripts...")
        results = await automation.execute_all_scripts()
        
        # 3. Review execution results
        for result in results:
            status = "✅" if result.status == 'completed' else "❌"
            print(f"{status} Script result: {result.status}")
        
        # 4. Collect generated files
        result_files = await automation.get_all_results()
        print(f"📁 Generated {len(result_files)} files")
        
        # 5. Download all results for analysis
        await automation.download_all_results("./output")
        
        # 6. Generate detailed execution report
        logs = await automation.get_execution_logs()
        await automation.save_execution_report(logs, "./report.json")
        
        print("🎉 Development iteration complete!")

if __name__ == "__main__":
    asyncio.run(development_flow())
```

## Python Automation API

The `BrowserBoxAutomation` class provides a Python interface to the browser-side JavaScript API:

### Script Management

```python
# Get all available scripts
scripts = await automation.get_all_scripts()  # List[ScriptInfo]

# Execute a specific script
result = await automation.execute_script(script_id)  # ExecutionResult

# Execute all scripts sequentially  
results = await automation.execute_all_scripts()  # List[ExecutionResult]

# Wait for script completion
result = await automation.wait_for_execution(script_id, timeout=120000)
```

### Result Management

```python
# Get all generated results
results = await automation.get_all_results()  # List[ResultFile]

# Get results for specific script
results = await automation.get_results_by_script(script_id)

# Download individual result
await automation.download_result(result_id)

# Download all results to directory
await automation.download_all_results("./downloads")
```

### Configuration Management

```python
# Load configuration package
success = await automation.load_configuration("./config.zip")

# Get active configuration
config = await automation.get_active_configuration()
```

### Utility Functions

```python
# Wait for custom JavaScript conditions
await automation.wait_for_condition("document.readyState === 'complete'")

# Get application status
status = await automation.get_application_status()
# Returns: {"ready": bool, "scriptsLoaded": int, "configLoaded": bool}

# Get detailed execution logs
logs = await automation.get_execution_logs()

# Save execution report to JSON
await automation.save_execution_report(logs, "./report.json")
```

## Data Attributes for Testing

All interactive elements include `data-testid` and `data-automation` attributes:

### Scripts
- `[data-testid="run-all-scripts"]` - Run all scripts button
- `[data-testid="script-card"]` - Individual script cards
- `[data-testid="run-script"]` - Individual script run buttons

### Results
- `[data-testid="result-card"]` - Result file cards
- `[data-testid="download-result"]` - Individual download buttons
- `[data-testid="download-all-results"]` - Download all button

### Configuration
- `[data-testid="load-configuration"]` - Load configuration button
- `[data-testid="config-file-input"]` - Hidden file input
- `[data-testid="activate-package"]` - Package activation buttons

## Development Workflow

### 1. Configuration Update Loop

```bash
# Update config.zip with new scripts/data
# Run automation to test changes
python e2e/workflow/workflow_automation.py --config config.zip --output ./results

# Check results and logs
cat ./results/execution-report.json
ls ./results/downloads/
```

### 2. Continuous Integration

```yaml
# .github/workflows/test-scripts.yml
name: Test BrowserBox Scripts

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install -r e2e/workflow/requirements.txt
          playwright install chromium
      
      - name: Start BrowserBox
        run: npm run dev &
      
      - name: Wait for BrowserBox
        run: |
          timeout 60 bash -c 'until curl -f http://localhost:5173; do sleep 2; done'
      
      - name: Run automation tests
        run: pytest e2e/workflow/test_automation.py -v
```

### 3. Custom Automation Scripts

```python
# custom_automation.py
import asyncio
from e2e.workflow.browserbox_automation import BrowserBoxAutomation

async def validate_data_pipeline():
    """Custom validation for data analysis pipeline."""
    
    async with BrowserBoxAutomation(headless=True) as automation:
        
        # Load specific configuration
        await automation.load_configuration('./configs/analysis-pipeline.zip')
        
        # Execute scripts
        results = await automation.execute_all_scripts()
        
        # Get generated results
        result_files = await automation.get_all_results()
        
        # Custom validations
        csv_results = [r for r in result_files if r.filename.endswith('.csv')]
        html_reports = [r for r in result_files if r.filename.endswith('.html')]
        
        assert len(csv_results) > 0, "Expected CSV output files"
        assert len(html_reports) > 0, "Expected HTML report files"
        
        print(f"✅ Pipeline validation passed: {len(csv_results)} CSV, {len(html_reports)} HTML")

if __name__ == "__main__":
    asyncio.run(validate_data_pipeline())
```

## Tips and Best Practices

1. **Use realistic timeouts** - Pyodide initialization can take time on first load
2. **Handle errors gracefully** - Scripts may fail, ensure your automation handles this
3. **Set up proper download directories** - Use absolute paths for result collection
4. **Use configuration packages** - Bundle scripts and data together for consistency
5. **Monitor resource usage** - Large datasets may cause memory issues in Pyodide
6. **Leverage async context managers** - Use `async with BrowserBoxAutomation()` for cleanup
7. **Test incrementally** - Start with small configs, gradually increase complexity

## Troubleshooting

### Common Issues

**App not loading**: Ensure BrowserBox is running on the expected port
```bash
npm run dev  # Should start on http://localhost:5173
```

**Automation API not available**: Wait for full app initialization
```python
await automation.wait_for_condition("typeof window.browserboxAutomation !== 'undefined'")
```

**Scripts timing out**: Increase timeout for complex computations
```python
result = await automation.wait_for_execution(script_id, timeout=300000)  # 5 minutes
```

**Download issues**: Ensure download directory exists and has permissions
```python
download_dir = Path("./downloads").resolve()
download_dir.mkdir(parents=True, exist_ok=True)
await automation.download_all_results(download_dir)
```

**Import errors**: Ensure you're in the correct directory
```bash
# Run from project root
cd /path/to/BrowserBoxV5
python e2e/workflow/workflow_automation.py --help
```

### Debug Mode

Run automation with debug options:
```bash
# Show browser during automation
python e2e/workflow/workflow_automation.py --config config.zip --headless=false

# Increase logging verbosity
python e2e/workflow/workflow_automation.py --config config.zip --log-level DEBUG

# Run tests with browser visible
pytest e2e/workflow/test_automation.py -v --headless=false -s

# Run single test for debugging  
pytest e2e/workflow/test_automation.py::TestBasicFunctionality::test_initialization -v -s
```

### Performance Tips

```python
# Use headless mode for faster execution
automation = BrowserBoxAutomation(headless=True)

# Batch operations when possible
results = await automation.execute_all_scripts()  # Better than individual calls

# Clean up resources properly
async with BrowserBoxAutomation() as automation:
    # Automatic cleanup on exit
    pass
```

## Comparison with Existing E2E Solution

This Python automation system complements the existing `e2e/pyodide-test-runner.html`:

| Feature | `e2e/pyodide-test-runner.html` | Python Automation |
|---------|--------------------------------|-------------------|
| **Use Case** | Individual script testing | Full workflow automation |
| **Complexity** | Simple, focused | Comprehensive |
| **Configuration** | Manual file loading | ZIP package automation |
| **UI Integration** | None (headless) | Full BrowserBox UI |
| **Best For** | Script debugging, unit tests | Development loops, integration tests |

**Recommended approach**: Use both systems complementarily:
1. **Development**: Use `e2e/individual/` for script debugging
2. **Integration**: Use `e2e/workflow/` for workflow validation  
3. **CI/CD**: Use `individual/` for unit tests, `workflow/` for integration tests

## Further Reading

- [Playwright for Python Documentation](https://playwright.dev/python/)
- [Pyodide Documentation](https://pyodide.org/)
- [Pytest Documentation](https://docs.pytest.org/)
- [BrowserBox Configuration Guide](../docs/configuration.md)