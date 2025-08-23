#!/usr/bin/env python3
"""
BrowserBox Workflow Automation Script

Complete automation workflow for BrowserBox development loop:
1. Load configuration package
2. Execute all scripts
3. Collect and download results
4. Generate execution report
5. Analyze results

Usage:
    python e2e/workflow/workflow_automation.py --config config.zip --output ./results
    
    # With custom options
    python e2e/workflow/workflow_automation.py \
        --config config.zip \
        --output ./results \
        --url http://localhost:5173 \
        --headless \
        --timeout 300
        
Requirements:
    pip install playwright
    playwright install chromium
"""

import argparse
import asyncio
import logging
import sys
import time
from pathlib import Path
from typing import Optional

from browserbox_automation import BrowserBoxAutomation


def setup_logging(level: str = "INFO") -> None:
    """Configure logging with appropriate format."""
    logging.basicConfig(
        level=getattr(logging, level.upper()),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler(),
        ]
    )


def parse_args() -> argparse.Namespace:
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description="Automate BrowserBox workflow: config → scripts → results",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    
    parser.add_argument(
        "--config", "-c",
        type=Path,
        help="Path to configuration ZIP file to load"
    )
    
    parser.add_argument(
        "--output", "-o",
        type=Path,
        default="./automation-results",
        help="Directory to save results and reports"
    )
    
    parser.add_argument(
        "--url",
        default="http://localhost:5173",
        help="URL where BrowserBox is running"
    )
    
    parser.add_argument(
        "--headless",
        action="store_true",
        help="Run browser in headless mode"
    )
    
    parser.add_argument(
        "--timeout",
        type=int,
        default=120,
        help="Script execution timeout in seconds"
    )
    
    parser.add_argument(
        "--log-level",
        choices=["DEBUG", "INFO", "WARNING", "ERROR"],
        default="INFO",
        help="Logging level"
    )
    
    return parser.parse_args()


async def run_workflow(
    config_path: Optional[Path] = None,
    output_dir: Path = Path("./automation-results"),
    base_url: str = "http://localhost:5173",
    headless: bool = True,
    timeout_seconds: int = 120
) -> dict:
    """
    Run complete BrowserBox automation workflow.
    
    Args:
        config_path: Optional configuration ZIP file to load
        output_dir: Directory to save results
        base_url: BrowserBox URL
        headless: Whether to run browser headless
        timeout_seconds: Script execution timeout
        
    Returns:
        Dictionary with workflow results and metrics
    """
    logger = logging.getLogger(__name__)
    start_time = time.time()
    
    # Ensure output directory exists
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    downloads_dir = output_dir / "downloads"
    downloads_dir.mkdir(parents=True, exist_ok=True)
    
    logger.info("🚀 Starting BrowserBox workflow automation")
    logger.info(f"📂 Output directory: {output_dir}")
    logger.info(f"🌐 BrowserBox URL: {base_url}")
    
    workflow_results = {
        "success": False,
        "start_time": start_time,
        "config_loaded": False,
        "scripts_executed": 0,
        "scripts_successful": 0,
        "scripts_failed": 0,
        "results_collected": 0,
        "errors": [],
        "execution_time": 0
    }
    
    try:
        async with BrowserBoxAutomation(headless=headless, base_url=base_url) as automation:
            
            # Step 1: Check application status
            logger.info("📊 Checking application status...")
            app_status = await automation.get_application_status()
            logger.info(f"Application ready: {app_status.get('ready', False)}")
            logger.info(f"Scripts loaded: {app_status.get('scriptsLoaded', 0)}")
            
            # Step 2: Load configuration if provided
            if config_path:
                if not config_path.exists():
                    error_msg = f"Configuration file not found: {config_path}"
                    logger.error(f"❌ {error_msg}")
                    workflow_results["errors"].append(error_msg)
                    return workflow_results
                
                logger.info(f"📦 Loading configuration: {config_path}")
                try:
                    await automation.load_configuration(config_path)
                    workflow_results["config_loaded"] = True
                    logger.info("✅ Configuration loaded successfully")
                    
                    # Check updated status
                    app_status = await automation.get_application_status()
                    logger.info(f"Scripts available after config: {app_status.get('scriptsLoaded', 0)}")
                    
                except Exception as e:
                    error_msg = f"Failed to load configuration: {e}"
                    logger.error(f"❌ {error_msg}")
                    workflow_results["errors"].append(error_msg)
                    return workflow_results
            else:
                logger.info("📋 No configuration file provided, using existing scripts")
            
            # Step 3: Get available scripts
            scripts = await automation.get_all_scripts()
            logger.info(f"📝 Found {len(scripts)} scripts available")
            
            if not scripts:
                logger.warning("⚠️ No scripts available for execution")
                workflow_results["success"] = True  # Not an error, just no scripts
                return workflow_results
            
            # Log script details
            for script in scripts:
                logger.info(f"  📄 {script.title} ({script.filename}) - Status: {script.status}")
            
            # Step 4: Execute all scripts
            logger.info("🚀 Executing all scripts...")
            try:
                execution_results = await automation.execute_all_scripts()
                workflow_results["scripts_executed"] = len(execution_results)
                
                # Analyze execution results
                successful = [r for r in execution_results if r.status == 'completed']
                failed = [r for r in execution_results if r.status == 'error']
                
                workflow_results["scripts_successful"] = len(successful)
                workflow_results["scripts_failed"] = len(failed)
                
                logger.info(f"✅ Script execution completed:")
                logger.info(f"   Successful: {len(successful)}")
                logger.info(f"   Failed: {len(failed)}")
                
                # Log failed scripts
                for result in failed:
                    if result.error:
                        logger.warning(f"   ❌ Script failed: {result.error}")
                        workflow_results["errors"].append(f"Script execution failed: {result.error}")
                
            except Exception as e:
                error_msg = f"Script execution failed: {e}"
                logger.error(f"❌ {error_msg}")
                workflow_results["errors"].append(error_msg)
                return workflow_results
            
            # Step 5: Collect results
            logger.info("📁 Collecting generated results...")
            try:
                result_files = await automation.get_all_results()
                workflow_results["results_collected"] = len(result_files)
                
                logger.info(f"📊 Found {len(result_files)} result files:")
                total_size = 0
                for result in result_files:
                    size_kb = result.file_size / 1024
                    total_size += size_kb
                    logger.info(f"   📄 {result.filename} ({size_kb:.1f} KB)")
                
                logger.info(f"📏 Total results size: {total_size:.1f} KB")
                
            except Exception as e:
                error_msg = f"Failed to collect results: {e}"
                logger.error(f"❌ {error_msg}")
                workflow_results["errors"].append(error_msg)
                return workflow_results
            
            # Step 6: Download results
            if result_files:
                logger.info("💾 Downloading results...")
                try:
                    await automation.download_all_results(downloads_dir)
                    logger.info(f"✅ Results downloaded to: {downloads_dir}")
                except Exception as e:
                    error_msg = f"Failed to download results: {e}"
                    logger.error(f"❌ {error_msg}")
                    workflow_results["errors"].append(error_msg)
            
            # Step 7: Generate execution report
            logger.info("📊 Generating execution report...")
            try:
                logs = await automation.get_execution_logs()
                report_path = output_dir / "execution-report.json"
                await automation.save_execution_report(logs, report_path)
                logger.info(f"✅ Execution report saved: {report_path}")
                
            except Exception as e:
                error_msg = f"Failed to generate report: {e}"
                logger.error(f"❌ {error_msg}")
                workflow_results["errors"].append(error_msg)
            
            # Mark workflow as successful
            workflow_results["success"] = True
            
    except Exception as e:
        error_msg = f"Workflow failed: {e}"
        logger.error(f"❌ {error_msg}")
        workflow_results["errors"].append(error_msg)
        return workflow_results
    
    finally:
        workflow_results["execution_time"] = time.time() - start_time
    
    return workflow_results


def print_workflow_summary(results: dict) -> None:
    """Print a summary of workflow execution."""
    print("\n" + "=" * 60)
    print("📋 WORKFLOW SUMMARY")
    print("=" * 60)
    
    status = "✅ SUCCESS" if results["success"] else "❌ FAILED"
    print(f"Status: {status}")
    print(f"Execution time: {results['execution_time']:.2f} seconds")
    
    if results["config_loaded"]:
        print("Configuration: ✅ Loaded")
    else:
        print("Configuration: ➖ Not provided")
    
    print(f"Scripts executed: {results['scripts_executed']}")
    print(f"  ✅ Successful: {results['scripts_successful']}")
    print(f"  ❌ Failed: {results['scripts_failed']}")
    print(f"Results collected: {results['results_collected']}")
    
    if results["errors"]:
        print(f"\n⚠️ Errors ({len(results['errors'])}):")
        for error in results["errors"]:
            print(f"  • {error}")
    
    if results["success"]:
        success_rate = results['scripts_successful'] / max(results['scripts_executed'], 1) * 100
        print(f"\n🎯 Success rate: {success_rate:.1f}%")
        
        if results['scripts_executed'] > 0:
            print(f"🚀 Ready for next development iteration!")
    
    print("=" * 60)


async def main() -> int:
    """Main entry point."""
    args = parse_args()
    setup_logging(args.log_level)
    
    logger = logging.getLogger(__name__)
    
    try:
        # Run workflow
        results = await run_workflow(
            config_path=args.config,
            output_dir=args.output,
            base_url=args.url,
            headless=args.headless,
            timeout_seconds=args.timeout
        )
        
        # Print summary
        print_workflow_summary(results)
        
        # Return appropriate exit code
        return 0 if results["success"] else 1
        
    except KeyboardInterrupt:
        logger.info("\n⚠️ Workflow interrupted by user")
        return 130
    
    except Exception as e:
        logger.error(f"💥 Unexpected error: {e}")
        return 1


if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)