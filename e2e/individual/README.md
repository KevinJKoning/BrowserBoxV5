# Individual Script Testing

Fast, focused testing of single Python scripts in an isolated Pyodide environment.

## 🎯 Purpose

- **Debug individual scripts** before integrating into workflows
- **Validate Pyodide compatibility** - ensure scripts run in browser environment
- **Quick feedback loop** - fast execution without UI overhead  
- **Unit testing** - test script logic in isolation
- **CI/CD integration** - lightweight testing in pipelines

## 📁 Files

- **`pyodide-test-runner.html`** - Standalone HTML test runner with Pyodide
- **`test-pyodide-script.py`** - Python CLI tool for automated testing
- **`README.md`** - This documentation

## 🚀 Quick Start

### Prerequisites

```bash
pip install playwright
playwright install chromium
```

### Basic Usage

```bash
# Test a single script
python e2e/individual/test-pyodide-script.py --script path/to/script.py

# Test with data files
python e2e/individual/test-pyodide-script.py \
    --script analysis.py \
    --data data.csv,config.json

# See all options
python e2e/individual/test-pyodide-script.py --help
```

## 📖 Detailed Usage

### Command Line Options

```bash
python e2e/individual/test-pyodide-script.py \
    --script SCRIPT_PATH \     # Required: Python script to test
    --data FILE1,FILE2,... \   # Optional: Comma-separated data files
    --help                     # Show help message
```

### Example: Testing a Data Analysis Script

```bash
# Create a test script
cat > test_script.py << 'EOF'
import pandas as pd
import numpy as np

# Read input data
df = pd.read_csv('sales_data.csv')

# Perform analysis  
summary = df.groupby('category').agg({
    'sales': ['sum', 'mean', 'count']
}).round(2)

# Save results
summary.to_csv('sales_summary.csv')
df.describe().to_csv('sales_stats.csv')

print(f"Processed {len(df)} rows")
print("Analysis complete!")
EOF

# Create sample data
cat > sales_data.csv << 'EOF'
category,sales,date
A,100,2024-01-01
B,150,2024-01-01
A,200,2024-01-02
C,75,2024-01-02
EOF

# Test the script
python e2e/individual/test-pyodide-script.py \
    --script test_script.py \
    --data sales_data.csv
```

### Example Output

```
🧪 Pyodide Script Tester
========================

📝 Script: test_script.py
📁 Data files: sales_data.csv
📂 Output directory: ./test-outputs

🚀 Starting browser test environment...
✅ Pyodide environment ready

▶️  Executing Python script...

📤 Processed 4 rows
📤 Analysis complete!

📊 Execution completed
⏱️  Execution time: 1247ms
✅ Success: True

💾 Saving 2 generated file(s):
   📄 sales_summary.csv → ./test-outputs/sales_summary.csv
   📄 sales_stats.csv → ./test-outputs/sales_stats.csv

==================================================
📋 SUMMARY
==================================================
Status: ✅ SUCCESS
Files generated: 2
Execution time: 1247ms
```

## 🔧 HTML Test Runner (Manual Testing)

For interactive testing, you can use the HTML test runner directly:

1. **Start BrowserBox**: `npm run dev`
2. **Open test runner**: Navigate to the HTML file in your browser
3. **Use browser console**: Call `window.runScript()` function

### Browser Console Usage

```javascript
// Example: Test a script with data files
const scriptContent = `
import pandas as pd
df = pd.DataFrame({'x': [1,2,3], 'y': [4,5,6]})
df.to_csv('output.csv', index=False)
print("Data saved!")
`;

const dataFiles = [
    {
        name: 'input.csv', 
        content: [/* array of bytes */]
    }
];

// Execute script
const result = await window.runScript(scriptContent, dataFiles);
console.log('Result:', result);
```

## 🧪 Integration with Testing Frameworks

### Pytest Integration

```python
# test_individual_scripts.py
import subprocess
import sys
import pytest
from pathlib import Path

def run_script_test(script_path, data_files=None):
    """Helper to run individual script tests."""
    cmd = [
        sys.executable, 
        'e2e/individual/test-pyodide-script.py',
        '--script', str(script_path)
    ]
    
    if data_files:
        cmd.extend(['--data', ','.join(data_files)])
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.returncode == 0, result.stdout, result.stderr

def test_data_processing_script():
    """Test that data processing script works correctly."""
    success, stdout, stderr = run_script_test(
        'scripts/process_data.py',
        ['test_data.csv']
    )
    
    assert success, f"Script failed: {stderr}"
    assert "Analysis complete" in stdout
    assert Path('test-outputs/results.csv').exists()

def test_visualization_script():
    """Test that visualization script generates outputs.""" 
    success, stdout, stderr = run_script_test('scripts/create_charts.py')
    
    assert success, f"Script failed: {stderr}"
    # Check that images were generated
    output_dir = Path('test-outputs')
    png_files = list(output_dir.glob('*.png'))
    assert len(png_files) > 0, "Expected PNG files to be generated"
```

### GitHub Actions Integration

```yaml
# .github/workflows/test-individual-scripts.yml
name: Test Individual Scripts

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
          pip install playwright
          playwright install chromium
      
      - name: Test scripts individually
        run: |
          # Test all Python scripts in scripts/ directory
          for script in scripts/*.py; do
            echo "Testing $script..."
            python e2e/individual/test-pyodide-script.py --script "$script"
          done
      
      - name: Archive test outputs
        uses: actions/upload-artifact@v3
        with:
          name: test-outputs
          path: test-outputs/
```

## 🎛️ Advanced Usage

### Custom Data File Generation

```python
# generate_test_data.py
import pandas as pd
import numpy as np
import json

# Generate CSV test data
df = pd.DataFrame({
    'id': range(1, 101),
    'value': np.random.randn(100),
    'category': np.random.choice(['A', 'B', 'C'], 100)
})
df.to_csv('test_data.csv', index=False)

# Generate JSON config
config = {
    'parameters': {'threshold': 0.5, 'iterations': 100},
    'output_format': 'csv'
}
with open('config.json', 'w') as f:
    json.dump(config, f, indent=2)

print("Test data generated!")
```

```bash
# Generate test data then run test
python generate_test_data.py
python e2e/individual/test-pyodide-script.py \
    --script analysis_script.py \
    --data test_data.csv,config.json
```

### Batch Testing Multiple Scripts

```bash
#!/bin/bash
# batch_test.sh - Test multiple scripts with common data

DATA_FILES="common_data.csv,config.json"

for script in scripts/*.py; do
    echo "Testing $(basename "$script")..."
    
    python e2e/individual/test-pyodide-script.py \
        --script "$script" \
        --data "$DATA_FILES"
    
    if [ $? -ne 0 ]; then
        echo "❌ FAILED: $script"
        exit 1
    else
        echo "✅ PASSED: $script"
    fi
done

echo "🎉 All scripts passed!"
```

## ⚡ Performance Tips

1. **Use minimal data files** for testing - small datasets test logic just as well
2. **Test core logic first** - separate I/O testing from algorithm testing
3. **Cache test data** - generate once, reuse for multiple tests
4. **Parallel execution** - run multiple script tests in parallel

```bash
# Parallel testing example
find scripts/ -name "*.py" | xargs -I {} -P 4 \
    python e2e/individual/test-pyodide-script.py --script {}
```

## 🐛 Debugging Tips

### Common Issues

**Script not found**: Use absolute paths or run from project root
```bash
cd /path/to/BrowserBoxV5
python e2e/individual/test-pyodide-script.py --script scripts/my_script.py
```

**Data file errors**: Verify file paths and formats
```bash
# Check files exist
ls -la data_file.csv config.json

# Test without data files first
python e2e/individual/test-pyodide-script.py --script my_script.py
```

**Pyodide package issues**: Some packages may not be available in Pyodide
```python
# Check package availability in script
try:
    import some_package
    print("✅ Package available")
except ImportError:
    print("❌ Package not available in Pyodide")
```

### Debug Mode

The test runner provides detailed console output. For even more debugging:

1. **Open browser console** during test execution
2. **Add debug prints** to your Python scripts  
3. **Check generated files** in `test-outputs/` directory
4. **Review error messages** in terminal output

## 🔗 Integration with Workflow Testing

After individual testing passes, integrate scripts into configurations for workflow testing:

```bash
# 1. Test individual script
python e2e/individual/test-pyodide-script.py --script analyze.py --data data.csv

# 2. Add to configuration package (ZIP file)
# ... create config.zip with script and data ...

# 3. Test complete workflow  
python e2e/workflow/workflow_automation.py --config config.zip --output results/
```

## 📊 Comparison with Workflow Testing

| Aspect | Individual Testing | Workflow Testing |
|--------|-------------------|------------------|
| **Speed** | ⚡ Very Fast (seconds) | 🐌 Slower (minutes) |
| **Scope** | Single script | Multiple scripts + UI |
| **Debugging** | 🔍 Excellent | 🔄 Context-dependent |
| **Setup** | 🟢 Minimal | 🟡 Moderate |
| **Use Case** | Development/debugging | Integration/validation |

## 📚 Further Reading

- **[Workflow Automation](../workflow/README.md)** - For complete workflow testing
- **[E2E Testing Overview](../README.md)** - Choosing the right approach
- **[Pyodide Documentation](https://pyodide.org/)** - Understanding the runtime environment

---

**Quick Links**: [← E2E Overview](../README.md) | [Workflow Testing →](../workflow/README.md)