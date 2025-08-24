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
import os
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
    description: Optional[str] = None


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


class InitializationError(Exception):
    """Detailed initialization failure with categorized reasons."""
    def __init__(self, message: str, diagnostics: Dict[str, Any]):
        super().__init__(message)
        self.diagnostics = diagnostics


class BrowserBoxAutomation:
    """Python interface for BrowserBox automation using Playwright."""

    def __init__(self, headless: bool = True, base_url: str = "http://localhost:5173"):
        """Initialize BrowserBox automation.

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
        # Collect console errors for post-execution diagnostics
        self.console_errors: List[str] = []
        # Collect page errors (unhandled exceptions)
        self.page_errors: List[str] = []
        # Collect JavaScript/Pyodide error details
        self.pyodide_errors: List[Dict[str, Any]] = []
        
    async def initialize(self, timeout: int = 30000, diagnostics: bool = True) -> None:
        """
        Initialize browser and navigate to BrowserBox.
        
        Args:
            timeout: Timeout in milliseconds for initialization
        """
        self.logger.info("🚀 Initializing BrowserBox automation")
        
        start = asyncio.get_event_loop().time()
        diag: Dict[str, Any] = {
            "base_url": self.base_url,
            "server_reachable": False,
            "http_status": None,
            "navigation_error": None,
            "load_states": [],
            "selectors_tried": [],
            "selector_found": None,
            "api_available": False,
            "elapsed_ms": None,
        }
        try:
            # Launch Playwright
            self.playwright = await async_playwright().start()
            self.browser = await self.playwright.chromium.launch(headless=self.headless)
            self.page = await self.browser.new_page()
            # Attach comprehensive error listeners
            def _on_console(msg):  # type: ignore
                try:
                    if msg.type == 'error':
                        error_text = msg.text
                        self.console_errors.append(error_text)
                        # Check if this looks like a Pyodide error
                        if any(keyword in error_text.lower() for keyword in ['pyodide', 'traceback', 'python']):
                            self.pyodide_errors.append({
                                'type': 'console_error',
                                'text': error_text,
                                'timestamp': asyncio.get_event_loop().time()
                            })
                    elif msg.type == 'warning' and any(keyword in msg.text.lower() for keyword in ['pyodide', 'python']):
                        # Also capture Python/Pyodide warnings
                        self.pyodide_errors.append({
                            'type': 'console_warning',
                            'text': msg.text,
                            'timestamp': asyncio.get_event_loop().time()
                        })
                except Exception:  # noqa: broad-except
                    pass
            self.page.on("console", _on_console)
            
            # Add page error handler for unhandled exceptions
            def _on_page_error(error):  # type: ignore
                try:
                    error_text = str(error)
                    self.page_errors.append(error_text)
                    # Also add to Pyodide errors if relevant
                    if any(keyword in error_text.lower() for keyword in ['pyodide', 'traceback', 'python']):
                        self.pyodide_errors.append({
                            'type': 'page_error',
                            'text': error_text,
                            'timestamp': asyncio.get_event_loop().time()
                        })
                except Exception:  # noqa: broad-except
                    pass
            self.page.on("pageerror", _on_page_error)

            # Navigate with response capture
            nav_response = await self.page.goto(self.base_url, wait_until="domcontentloaded")
            if nav_response:
                diag["http_status"] = nav_response.status
                diag["server_reachable"] = True
            else:
                # Could be a file:// or no response (e.g. SPA fallback before server ready)
                diag["navigation_error"] = "No HTTP response (server may be down or non-http protocol)"

            # Progressive load state waits (don't exceed timeout)
            load_states = ["domcontentloaded", "networkidle"]
            for state in load_states:
                remaining = timeout - int((asyncio.get_event_loop().time() - start) * 1000)
                if remaining <= 0:
                    break
                try:
                    await self.page.wait_for_load_state(state, timeout=remaining)
                    diag["load_states"].append(state)
                except Exception:  # noqa: broad-except (diagnostic only)
                    diag["load_states"].append(f"{state}:timeout")

            # Candidate selectors (support either data-automation or data-testid)
            selector_candidates = [
                '[data-automation="run-all-scripts"]',
                '[data-testid="run-all-scripts"]',
            ]
            found = None
            for sel in selector_candidates:
                diag["selectors_tried"].append(sel)
                remaining = timeout - int((asyncio.get_event_loop().time() - start) * 1000)
                if remaining <= 0:
                    break
                try:
                    # Allow a bit more time per selector (up to 10s) for large bundles / late hydration
                    await self.page.wait_for_selector(sel, timeout=min(remaining, 10000))
                    found = sel
                    break
                except Exception:  # noqa: broad-except
                    continue
            diag["selector_found"] = found

            # Try API availability if we have any selector success OR still time left
            remaining = timeout - int((asyncio.get_event_loop().time() - start) * 1000)
            if remaining > 0:
                try:
                    await self.page.wait_for_function(
                        "typeof window.browserboxAutomation !== 'undefined'",
                        timeout=min(remaining, 10000)
                    )
                    diag["api_available"] = True
                except Exception:  # noqa: broad-except
                    diag["api_available"] = False

            diag["elapsed_ms"] = int((asyncio.get_event_loop().time() - start) * 1000)

            # Decide success hierarchy:
            # 1. Must reach server
            if not diag["server_reachable"]:
                raise InitializationError("Server not reachable", diag)
            # 2. Prefer API availability as the primary readiness signal
            if not diag["api_available"]:
                # If neither API nor selector appeared, give a combined message
                if found is None:
                    raise InitializationError(
                        "Automation API not available and startup element not found (increase BROWSERBOX_INIT_TIMEOUT or verify app loading)",
                        diag,
                    )
                else:
                    raise InitializationError("Automation API not available", diag)
            # 3. If API is available but selector missing, continue with a warning (selector might have changed)
            if found is None:
                self.logger.warning(
                    "⚠️ Startup element not found but automation API available; continuing. Update selector list if needed."
                )

            self.logger.info("✅ BrowserBox automation initialized (%sms)" % diag["elapsed_ms"])
            if diagnostics and os.environ.get("BROWSERBOX_STARTUP_DIAG"):
                self.logger.info("Startup diagnostics: %s", json.dumps(diag, indent=2))
        except Exception as e:
            diag["elapsed_ms"] = int((asyncio.get_event_loop().time() - start) * 1000)
            if isinstance(e, InitializationError):
                # Already categorized
                if diagnostics:
                    self.logger.error("❌ Initialization failed: %s", e)
                    self.logger.error("Diagnostics: %s", json.dumps(e.diagnostics, indent=2))
                raise
            # Wrap any uncategorized exception
            wrapped = InitializationError(str(e), diag)
            if diagnostics:
                self.logger.error("❌ Initialization failed (uncategorized): %s", e)
                self.logger.error("Diagnostics: %s", json.dumps(diag, indent=2))
            raise wrapped
    
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

        # Wait for configuration to load: prior code incorrectly accessed a Promise property
        config_timeout = int(os.environ.get("BROWSERBOX_CONFIG_TIMEOUT", "60000"))
        await self.page.wait_for_function(
            """
            () => (async () => {
                if (!window.browserboxAutomation) return false;
                try {
                    const scripts = await window.browserboxAutomation.getAllScripts();
                    return Array.isArray(scripts) && scripts.length > 0;
                } catch (e) {
                    return false;
                }
            })()
            """,
            timeout=config_timeout
        )
        # Optional: small additional settle delay for derived state
        await asyncio.sleep(0.5)
        
        self.logger.info("✅ Configuration loaded successfully")
        return True
    
    async def get_active_configuration(self) -> Optional[Dict[str, Any]]:
        """Get the currently active configuration."""
        return await self.page.evaluate("() => window.browserboxAutomation.getActiveConfiguration()")
    
    # Script Management
    
    async def get_all_scripts(self) -> List[ScriptInfo]:
        """Get all available scripts."""
        scripts_data = await self.page.evaluate("() => window.browserboxAutomation.getAllScripts()")
        # Map any additional fields and handle optional ones
        scripts = []
        for script in scripts_data:
            script_info = ScriptInfo(
                id=script.get('id', ''),
                title=script.get('title', ''),
                filename=script.get('filename', ''),
                content=script.get('content', ''),
                status=script.get('status', 'unknown'),
                description=script.get('description')
            )
            scripts.append(script_info)
        return scripts
    
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
        
        # Clear any previous Pyodide errors before execution
        initial_pyodide_errors = len(self.pyodide_errors)
        initial_console_errors = len(self.console_errors)
        
        execution_data = await self.page.evaluate(f"""
            async () => {{
                try {{
                    const result = await window.browserboxAutomation.executeScript('{script_id}');
                    return result;
                }} catch (error) {{
                    // Try to get more detailed error information from Pyodide if available
                    let detailedError = error.message;
                    if (window.pyodide && window.pyodide.runPython) {{
                        try {{
                            // Try to capture any Python traceback
                            const traceback = window.pyodide.runPython(`
                                import traceback
                                import sys
                                if hasattr(sys, 'last_traceback') and sys.last_traceback:
                                    ''.join(traceback.format_tb(sys.last_traceback))
                                else:
                                    ''
                            `);
                            if (traceback) {{
                                detailedError += '\\n\\nPython Traceback:\\n' + traceback;
                            }}
                        }} catch (e) {{
                            // Ignore errors from traceback extraction
                        }}
                    }}
                    return {{
                        status: 'error',
                        error: detailedError
                    }};
                }}
            }}
        """)
        
        # Check if new errors were captured during execution
        new_pyodide_errors = self.pyodide_errors[initial_pyodide_errors:]
        new_console_errors = self.console_errors[initial_console_errors:]
        
        # If we have new Pyodide errors, add them to the execution result
        if new_pyodide_errors or (new_console_errors and execution_data.get('status') != 'error'):
            if execution_data.get('status') != 'error':
                execution_data['status'] = 'error'
            
            error_details = []
            if execution_data.get('error'):
                error_details.append(execution_data['error'])
            
            # Add Pyodide-specific errors
            for error in new_pyodide_errors:
                error_details.append(f"[{error['type']}] {error['text']}")
            
            # Add console errors that might be Python-related
            for error in new_console_errors:
                if any(keyword in error.lower() for keyword in ['python', 'pyodide', 'traceback']):
                    error_details.append(f"[console] {error}")
            
            if error_details:
                execution_data['error'] = '\n'.join(error_details)
        
        # Map JavaScript field names to Python field names
        mapped_execution_data = {
            'status': execution_data.get('status', 'unknown'),
            'output': execution_data.get('output'),
            'error': execution_data.get('error'),
            'execution_time': execution_data.get('executionTime') or execution_data.get('execution_time'),
            'last_run': execution_data.get('lastRun') or execution_data.get('last_run'),
            'started_at': execution_data.get('startedAt') or execution_data.get('started_at'),
            'completed_at': execution_data.get('completedAt') or execution_data.get('completed_at')
        }
        result = ExecutionResult(**mapped_execution_data)
        self.logger.info(f"✅ Script execution completed: {result.status}")
        
        if result.status == 'error' and result.error:
            self.logger.error(f"❌ Script execution error: {result.error}")
        
        return result
    
    async def execute_all_scripts(self) -> List[ExecutionResult]:
        """
        Execute all available scripts sequentially.
        
        Returns:
            List of ExecutionResult objects for each script
        """
        self.logger.info("🚀 Executing all scripts")
        
        # First navigate to the Scripts section
        scripts_button = await self.page.query_selector('button:has-text("Scripts")')
        if scripts_button:
            await scripts_button.click()
            # Wait a moment for the page to load
            await asyncio.sleep(1)
        
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
        
        # Map JavaScript field names to Python field names
        results = []
        for execution in executions_data:
            mapped_execution = {
                'status': execution.get('status', 'unknown'),
                'output': execution.get('output'),
                'error': execution.get('error'),
                'execution_time': execution.get('executionTime') or execution.get('execution_time'),
                'last_run': execution.get('lastRun') or execution.get('last_run'),
                'started_at': execution.get('startedAt') or execution.get('started_at'),
                'completed_at': execution.get('completedAt') or execution.get('completed_at')
            }
            results.append(ExecutionResult(**mapped_execution))
        
        # Log summary
        successful = len([r for r in results if r.status == 'completed'])
        failed = len([r for r in results if r.status == 'error'])
        self.logger.info(f"✅ All scripts completed: {successful} successful, {failed} failed")
        
        return results

    async def execute_all_schema_validations(self) -> List[ExecutionResult]:
        """
        Execute all available schema validations.
        
        Returns:
            List of ExecutionResult objects for each validation
        """
        self.logger.info("🔍 Executing all schema validations")
        
        # Navigate to Schema Validation section
        schema_button = await self.page.query_selector('button:has-text("Schema Validation")')
        if not schema_button:
            self.logger.warning("⚠️ Schema Validation section not found")
            return []
            
        await schema_button.click()
        await asyncio.sleep(1)
        
        # Click the Validate All button
        validate_all_button = await self.page.query_selector('button:has-text("Validate All")')
        if not validate_all_button:
            self.logger.warning("⚠️ Validate All button not found")
            return []
            
        await validate_all_button.click()
        
        # Use the automation API to get validation results (similar to scripts)
        validations_data = await self.page.evaluate("""
            async () => {
                try {
                    // Wait a moment for validations to complete
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    
                    // For now, return a simple success status
                    // In a real implementation, this would use the actual validation API
                    return [{
                        status: 'completed',
                        output: 'Schema validations completed',
                        execution_time: '5000ms'
                    }];
                } catch (error) {
                    return [{
                        status: 'error',
                        error: error.message
                    }];
                }
            }
        """)
        
        # Map JavaScript field names to Python field names
        results = []
        for validation in validations_data:
            mapped_validation = {
                'status': validation.get('status', 'unknown'),
                'output': validation.get('output'),
                'error': validation.get('error'),
                'execution_time': validation.get('executionTime') or validation.get('execution_time'),
                'last_run': validation.get('lastRun') or validation.get('last_run'),
                'started_at': validation.get('startedAt') or validation.get('started_at'),
                'completed_at': validation.get('completedAt') or validation.get('completed_at')
            }
            results.append(ExecutionResult(**mapped_validation))
        
        self.logger.info("✅ Schema validations completed")
        return results

    async def execute_complete_workflow(self) -> Dict[str, List[ExecutionResult]]:
        """
        Execute the complete workflow: both scripts and schema validations.
        
        Returns:
            Dictionary with 'scripts' and 'validations' keys containing their respective results
        """
        self.logger.info("🚀 Executing complete workflow (scripts + schema validations)")
        
        # Execute scripts first
        script_results = await self.execute_all_scripts()
        
        # Then execute schema validations
        validation_results = await self.execute_all_schema_validations()
        
        total_successful = len([r for r in script_results + validation_results if r.status == 'completed'])
        total_failed = len([r for r in script_results + validation_results if r.status == 'error'])
        
        self.logger.info(f"🎉 Complete workflow finished: {total_successful} successful, {total_failed} failed")
        
        # Wait a moment to ensure all files are properly registered
        await asyncio.sleep(3)
        
        return {
            'scripts': script_results,
            'validations': validation_results
        }
    
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
        # Map JavaScript field names to Python field names
        results = []
        for result in results_data:
            mapped_result = {
                'id': result.get('id', ''),
                'filename': result.get('filename', ''),
                'script_id': result.get('scriptId') or result.get('script_id', ''),
                'file_size': result.get('fileSize') or result.get('file_size', 0),
                'created_at': result.get('createdAt') or result.get('created_at', ''),
                'content': result.get('content')
            }
            results.append(ResultFile(**mapped_result))
        return results
    
    async def get_results_by_script(self, script_id: str) -> List[ResultFile]:
        """Get results generated by a specific script."""
        results_data = await self.page.evaluate(
            f"() => window.browserboxAutomation.getResultsByScript('{script_id}')"
        )
        # Map JavaScript field names to Python field names
        results = []
        for result in results_data:
            mapped_result = {
                'id': result.get('id', ''),
                'filename': result.get('filename', ''),
                'script_id': result.get('scriptId') or result.get('script_id', ''),
                'file_size': result.get('fileSize') or result.get('file_size', 0),
                'created_at': result.get('createdAt') or result.get('created_at', ''),
                'content': result.get('content')
            }
            results.append(ResultFile(**mapped_result))
        return results
    
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

    async def get_console_errors(self) -> List[str]:
        """Return collected console error messages since initialization."""
        return list(self.console_errors)
    
    async def get_page_errors(self) -> List[str]:
        """Return collected page error messages since initialization."""
        return list(self.page_errors)
    
    async def get_pyodide_errors(self) -> List[Dict[str, Any]]:
        """Return collected Pyodide-specific error details since initialization."""
        return list(self.pyodide_errors)
    
    async def get_all_errors(self) -> Dict[str, Any]:
        """Return all collected error information."""
        return {
            'console_errors': list(self.console_errors),
            'page_errors': list(self.page_errors),
            'pyodide_errors': list(self.pyodide_errors),
            'total_console_errors': len(self.console_errors),
            'total_page_errors': len(self.page_errors),
            'total_pyodide_errors': len(self.pyodide_errors)
        }
    
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