#!/usr/bin/env python3

"""
Simple CLI tool to test Python scripts in Pyodide environment

Usage:
    python e2e/test-pyodide-script.py --script=path/to/script.py --data=file1.csv,file2.parquet
"""

import argparse
import asyncio
import json
import os
import sys
from pathlib import Path

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("❌ Error: Playwright not found. Install with: pip install playwright")
    print("   Then run: playwright install chromium")
    sys.exit(1)


def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description="Test Python scripts in Pyodide environment"
    )
    parser.add_argument(
        "--script", 
        required=True, 
        help="Path to Python script to test"
    )
    parser.add_argument(
        "--data", 
        help="Comma-separated list of data files to include"
    )
    return parser.parse_args()


def read_script_file(script_path):
    """Read and validate script file."""
    script_file = Path(script_path)
    
    if not script_file.exists():
        print(f"❌ Error: Script file not found: {script_path}")
        sys.exit(1)
    
    try:
        return script_file.read_text(encoding='utf-8')
    except Exception as error:
        print(f"❌ Error reading script file: {error}")
        sys.exit(1)


def read_data_files(data_files_arg):
    """Read and validate data files."""
    if not data_files_arg:
        return []
    
    file_paths = [f.strip() for f in data_files_arg.split(',')]
    data_files = []
    
    for file_path in file_paths:
        file_obj = Path(file_path)
        
        if not file_obj.exists():
            print(f"❌ Error: Data file not found: {file_path}")
            sys.exit(1)
        
        try:
            content = file_obj.read_bytes()
            data_files.append({
                'name': file_obj.name,
                'content': list(content)  # Convert to list for JSON serialization
            })
        except Exception as error:
            print(f"❌ Error reading data file {file_path}: {error}")
            sys.exit(1)
    
    return data_files


def ensure_output_dir():
    """Ensure output directory exists."""
    output_dir = Path.cwd() / 'test-outputs'
    output_dir.mkdir(exist_ok=True)
    return output_dir


async def run_test():
    """Main test execution function."""
    args = parse_args()
    
    print('🧪 Pyodide Script Tester')
    print('========================\n')
    
    # Read and validate inputs
    script_content = read_script_file(args.script)
    data_files = read_data_files(args.data)
    output_dir = ensure_output_dir()
    
    print(f'📝 Script: {args.script}')
    if data_files:
        file_names = [f['name'] for f in data_files]
        print(f'📁 Data files: {", ".join(file_names)}')
    print(f'📂 Output directory: {output_dir}\n')
    
    # Launch browser and run test
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        try:
            print('🚀 Starting browser test environment...')
            
            # Load the test runner page
            test_runner_path = Path(__file__).parent / 'pyodide-test-runner.html'
            await page.goto(f'file://{test_runner_path.absolute()}')
            
            # Wait for Pyodide to be ready
            await page.wait_for_function(
                'window.pyodideReady === true', 
                timeout=60000
            )
            print('✅ Pyodide environment ready\n')
            
            # Set up console output handling
            stdout_lines = []
            stderr_lines = []
            
            def handle_console(msg):
                text = msg.text
                if msg.type == 'error':
                    stderr_lines.append(text)
                    print(f'🔴 {text}')
                elif text.startswith('STDOUT:'):
                    output = text[7:]  # Remove 'STDOUT:' prefix
                    stdout_lines.append(output)
                    print(f'📤 {output}')
                elif text.startswith('STDERR:'):
                    output = text[7:]  # Remove 'STDERR:' prefix
                    stderr_lines.append(output)
                    print(f'🔴 {output}')
            
            page.on('console', handle_console)
            
            print('▶️  Executing Python script...\n')
            
            # Execute the script
            result = await page.evaluate(
                '''async ({ scriptContent, dataFiles }) => {
                    return await window.runScript(scriptContent, dataFiles);
                }''',
                {'scriptContent': script_content, 'dataFiles': data_files}
            )
            
            print('\n📊 Execution completed')
            print(f'⏱️  Execution time: {result["executionTime"]}ms')
            print(f'✅ Success: {result["success"]}')
            
            if result.get('error'):
                print(f'❌ Error: {result["error"]}')
            
            # Save any generated files
            modified_files = result.get('modifiedFiles', [])
            if modified_files:
                print(f'\n💾 Saving {len(modified_files)} generated file(s):')
                
                for file_info in modified_files:
                    output_path = output_dir / file_info['name']
                    file_data = bytes(file_info['data'])
                    output_path.write_bytes(file_data)
                    print(f'   📄 {file_info["name"]} → {output_path}')
            else:
                print('\n📭 No files generated')
            
            # Final summary
            print('\n' + '=' * 50)
            print('📋 SUMMARY')
            print('=' * 50)
            print(f'Status: {"✅ SUCCESS" if result["success"] else "❌ FAILED"}')
            print(f'Files generated: {len(modified_files)}')
            print(f'Execution time: {result["executionTime"]}ms')
            
            # Exit with appropriate code
            return 0 if result['success'] else 1
            
        except Exception as error:
            print(f'\n❌ Test execution failed: {error}')
            return 1
        finally:
            await browser.close()


def main():
    """Entry point with error handling."""
    try:
        exit_code = asyncio.run(run_test())
        sys.exit(exit_code)
    except KeyboardInterrupt:
        print('\n\n⚠️  Test interrupted by user')
        sys.exit(1)
    except Exception as error:
        print(f'\n💥 Unexpected error: {error}')
        sys.exit(1)


if __name__ == '__main__':
    main()