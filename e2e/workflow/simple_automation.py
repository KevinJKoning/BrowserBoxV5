#!/usr/bin/env python3
"""
Simple BrowserBox Automation - One Click Workflow

Load a config zip → Run all scripts → Download results → Get detailed errors if any fail

Usage:
    python e2e/workflow/simple_automation.py path/to/config.zip
    python e2e/workflow/simple_automation.py temp/demo-config.zip

Requirements:
    pip install playwright
    playwright install chromium
"""

import asyncio
import sys
import time
from pathlib import Path
from playwright.async_api import async_playwright

async def run_one_click_workflow(config_path: str):
    """
    Simple one-click workflow:
    1. Load config 
    2. Run all scripts
    3. Download results or show detailed errors
    """
    config_path = Path(config_path)
    if not config_path.exists():
        print(f"❌ Config file not found: {config_path}")
        return False
    
    print(f"🚀 Starting BrowserBox workflow with {config_path.name}")
    
    async with async_playwright() as p:
        # Launch browser
        browser = await p.chromium.launch(headless=False)  # Show browser for debugging
        page = await browser.new_page()
        
        try:
            # Navigate to BrowserBox
            print("📱 Loading BrowserBox...")
            await page.goto("http://localhost:5173")
            await page.wait_for_load_state("networkidle")
            
            # Wait for app to be ready
            print("⏳ Waiting for app to initialize...")
            await page.wait_for_selector('[data-testid="load-configuration"]', timeout=30000)
            
            # Load configuration
            print(f"📦 Loading configuration: {config_path.name}")
            
            # Upload config file
            file_input = page.locator('input[type="file"]').first
            await file_input.set_input_files(str(config_path))
            
            # Wait a moment for processing
            await page.wait_for_timeout(2000)
            
            # Activate the package if there's an activation button
            activate_buttons = page.locator('[data-testid="activate-package"]')
            if await activate_buttons.count() > 0:
                await activate_buttons.first.click()
                await page.wait_for_timeout(3000)
            
            # Check if scripts are loaded
            scripts = page.locator('[data-testid="script-card"]')
            script_count = await scripts.count()
            
            if script_count == 0:
                print("❌ No scripts found after loading configuration")
                return False
            
            print(f"📝 Found {script_count} scripts")
            
            # Run all scripts
            print("🚀 Executing all scripts...")
            run_all_button = page.locator('[data-testid="run-all-scripts"]')
            
            if await run_all_button.count() == 0:
                print("❌ Run all scripts button not found")
                return False
            
            await run_all_button.click()
            
            # Wait for execution to complete (check for results or errors)
            print("⏳ Waiting for execution to complete...")
            
            # Wait up to 5 minutes for completion
            timeout = 300  # 5 minutes
            start_time = time.time()
            
            while time.time() - start_time < timeout:
                # Check if we have results or errors
                results = page.locator('[data-testid="result-card"]')
                result_count = await results.count()
                
                # Check for error states in scripts
                script_elements = page.locator('[data-testid="script-card"]')
                
                error_count = 0
                completed_count = 0
                running_count = 0
                
                for i in range(await script_elements.count()):
                    script = script_elements.nth(i)
                    
                    # Look for error indicators (red color, error text, etc.)
                    if await script.locator('.text-red-500, .text-destructive, [class*="error"]').count() > 0:
                        error_count += 1
                    elif await script.locator('.text-green-500, [class*="success"], [class*="complete"]').count() > 0:
                        completed_count += 1
                    elif await script.locator('.animate-spin, [class*="loading"], [class*="running"]').count() > 0:
                        running_count += 1
                
                total_processed = completed_count + error_count
                
                print(f"📊 Progress: {completed_count} completed, {error_count} errors, {running_count} running")
                
                # If all scripts are processed (completed or errored)
                if total_processed >= script_count:
                    break
                
                await page.wait_for_timeout(5000)  # Check every 5 seconds
            
            # Final status check
            if error_count > 0:
                print(f"⚠️ {error_count} scripts failed. Collecting error details...")
                
                # Get detailed error information
                for i in range(script_count):
                    script = script_elements.nth(i)
                    
                    # Check if this script has an error
                    if await script.locator('.text-red-500, .text-destructive, [class*="error"]').count() > 0:
                        script_title = await script.locator('h3, .font-semibold').first.text_content()
                        error_text = await script.locator('.text-red-500, .text-destructive, [class*="error"]').first.text_content()
                        
                        print(f"❌ Script '{script_title}' failed:")
                        print(f"   Error: {error_text}")
                        
                        # Look for console errors or stack traces
                        console_output = script.locator('pre, code, .font-mono')
                        if await console_output.count() > 0:
                            console_text = await console_output.first.text_content()
                            if console_text and len(console_text) > 20:  # Likely actual error output
                                print(f"   Details: {console_text}")
            
            # Download results if any exist
            results = page.locator('[data-testid="result-card"]')
            result_count = await results.count()
            
            if result_count > 0:
                print(f"📁 Found {result_count} result files. Downloading...")
                
                # Try to download all results
                download_all_button = page.locator('[data-testid="download-all-results"]')
                if await download_all_button.count() > 0:
                    # Set up download handling
                    async with page.expect_download() as download_info:
                        await download_all_button.click()
                    
                    download = await download_info.value
                    download_path = f"./browserbox-results-{int(time.time())}.zip"
                    await download.save_as(download_path)
                    print(f"✅ Results downloaded to: {download_path}")
                else:
                    print("⚠️ Download all button not found, downloading individual files...")
                    # Try individual downloads
                    download_buttons = page.locator('[data-testid="download-result"]')
                    for i in range(await download_buttons.count()):
                        try:
                            async with page.expect_download() as download_info:
                                await download_buttons.nth(i).click()
                            download = await download_info.value
                            download_path = f"./result-{i}-{int(time.time())}.{download.suggested_filename.split('.')[-1] if '.' in download.suggested_filename else 'file'}"
                            await download.save_as(download_path)
                            print(f"✅ Downloaded: {download_path}")
                        except Exception as e:
                            print(f"⚠️ Failed to download result {i}: {e}")
            
            # Summary
            if error_count == 0 and result_count > 0:
                print(f"🎉 Workflow completed successfully!")
                print(f"   ✅ {completed_count} scripts executed")
                print(f"   📁 {result_count} results downloaded")
                return True
            elif error_count > 0:
                print(f"⚠️ Workflow completed with errors:")
                print(f"   ✅ {completed_count} scripts succeeded")
                print(f"   ❌ {error_count} scripts failed")
                print(f"   📁 {result_count} results downloaded")
                return False
            else:
                print("⚠️ Workflow completed but no results generated")
                return False
        
        except Exception as e:
            print(f"💥 Workflow failed with error: {e}")
            
            # Try to get console errors
            try:
                console_errors = await page.evaluate("() => window.console.errors || []")
                if console_errors:
                    print("🔍 Console errors:")
                    for error in console_errors:
                        print(f"   {error}")
            except:
                pass
            
            return False
        
        finally:
            await browser.close()


def main():
    if len(sys.argv) != 2:
        print("Usage: python simple_automation.py path/to/config.zip")
        print("Example: python simple_automation.py temp/demo-config.zip")
        sys.exit(1)
    
    config_path = sys.argv[1]
    success = asyncio.run(run_one_click_workflow(config_path))
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()