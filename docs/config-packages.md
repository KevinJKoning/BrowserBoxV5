# Configuration Package Documentation

Configuration packages are ZIP files that define the analysis workflows, file requirements, and data validation rules for your BrowserBox workspace. They provide a portable way to share and distribute complete analytical configurations.

## Table of Contents

- [Package Structure](#package-structure)
- [Creating a Configuration Package](#creating-a-configuration-package)
- [Package Metadata (package.json)](#package-metadata-packagejson)
- [File Requirements (files/requirements.json)](#file-requirements-filesrequirementsjson)
- [Analysis Scripts (scripts/)](#analysis-scripts-scripts)
- [Schema Validations (schemas/)](#schema-validations-schemas)
- [Best Practices](#best-practices)
- [Validation Rules](#validation-rules)
- [Troubleshooting](#troubleshooting)
- [Examples](#examples)

## Package Structure

Every configuration package must be a ZIP file with the following structure:

```
my-config-package.zip
├── package.json                    # Required: Package metadata
├── files/                          # Optional: File requirements
│   └── requirements.json           # File upload requirements
├── scripts/                        # Optional: Analysis scripts
│   ├── metadata.json               # Script definitions
│   ├── data_analysis.py            # Python script files
│   └── visualization.py
└── schemas/                        # Optional: Data validations  
    ├── metadata.json               # Schema definitions
    ├── data_validation.py          # Python validation scripts
    └── quality_check.py
```

### Required Files

- **`package.json`** - Package metadata and version information

### Optional Directories

- **`files/`** - Defines what files users need to upload
- **`scripts/`** - Python analysis scripts that can be executed
- **`schemas/`** - Data validation and quality check scripts

## Creating a Configuration Package

### Step 1: Create the Directory Structure

```bash
mkdir my-config
cd my-config
mkdir files scripts schemas
```

### Step 2: Create Package Metadata

Create `package.json` with your package information:

```json
{
  "name": "my-analysis-config",
  "version": "1.0.0", 
  "description": "Custom analysis configuration for my project",
  "author": "Your Name",
  "created": "2025-01-20T10:00:00.000Z",
  "updated": "2025-01-20T10:00:00.000Z"
}
```

### Step 3: Define File Requirements (Optional)

Create `files/requirements.json` to specify what files users should upload:

```json
[
  {
    "id": "main_dataset",
    "title": "Main Dataset", 
    "description": "Primary data file for analysis",
    "defaultFilename": "data.csv",
    "required": true,
    "acceptedTypes": [".csv", ".parquet"],
    "maxSize": 50
  }
]
```

### Step 4: Add Analysis Scripts (Optional)

Create `scripts/metadata.json` and corresponding Python files:

```json
[
  {
    "id": "basic-analysis",
    "title": "Basic Data Analysis",
    "description": "Perform basic statistical analysis on the dataset", 
    "filename": "basic_analysis.py",
    "category": "analysis",
    "dependencies": []
  }
]
```

### Step 5: Add Validation Scripts (Optional)

Create `schemas/metadata.json` and corresponding Python files:

```json
[
  {
    "id": "data-quality",
    "title": "Data Quality Check",
    "description": "Validate data quality and completeness",
    "filename": "quality_check.py", 
    "category": "validation",
    "dependencies": []
  }
]
```

### Step 6: Create the ZIP Package

```bash
zip -r my-config-package.zip *
```

## Package Metadata (package.json)

The `package.json` file contains essential metadata about your configuration package.

### Required Fields

```json
{
  "name": "string",           // Unique package identifier
  "version": "string",        // Semantic version (e.g., "1.0.0")
  "description": "string"     // Brief package description
}
```

### Optional Fields

```json
{
  "author": "string",         // Package author
  "created": "ISO8601",       // Creation timestamp
  "updated": "ISO8601",       // Last update timestamp
  "keywords": ["string"],     // Search keywords
  "license": "string",        // License identifier
  "homepage": "string",       // Documentation URL
  "repository": "string"      // Source repository URL
}
```

### Example

```json
{
  "name": "sales-analysis-config",
  "version": "2.1.0",
  "description": "Comprehensive sales data analysis and forecasting package",
  "author": "Analytics Team <analytics@company.com>",
  "created": "2025-01-01T00:00:00.000Z", 
  "updated": "2025-01-20T10:30:00.000Z",
  "keywords": ["sales", "forecasting", "business-intelligence"],
  "license": "MIT",
  "homepage": "https://docs.company.com/analytics/sales-config"
}
```

## File Requirements (files/requirements.json)

File requirements define what data files users need to upload to use your configuration.

### Structure

```json
[
  {
    "id": "unique_identifier",
    "title": "Display Name",
    "description": "Detailed description of the file purpose",
    "defaultFilename": "expected_filename.ext",
    "required": true,
    "acceptedTypes": [".csv", ".parquet", ".xlsx"],
    "maxSize": 100
  }
]
```

### Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for this file requirement |
| `title` | string | Yes | Human-readable name shown in UI |
| `description` | string | Yes | Detailed explanation of file purpose |
| `defaultFilename` | string | Yes | Expected filename (used for matching) |
| `required` | boolean | Yes | Whether this file is mandatory |
| `acceptedTypes` | string[] | No | Allowed file extensions (e.g., [".csv", ".xlsx"]) |
| `maxSize` | number | No | Maximum file size in MB |

### File Type Support

BrowserBox supports these file types for analysis:

- **Data**: `.csv`, `.parquet`, `.xlsx`, `.json`
- **Geospatial**: `.gpkg`, `.geojson`, `.shp` (with supporting files)
- **Documents**: `.pdf`, `.txt`, `.md`
- **Images**: `.jpg`, `.jpeg`, `.png`, `.gif`

### Example

```json
[
  {
    "id": "sales_data",
    "title": "Sales Transaction Data",
    "description": "Monthly sales transactions with customer, product, and revenue information. Should contain columns: date, customer_id, product_id, quantity, revenue.",
    "defaultFilename": "sales_transactions.csv",
    "required": true,
    "acceptedTypes": [".csv", ".parquet"],
    "maxSize": 200
  },
  {
    "id": "customer_data", 
    "title": "Customer Demographics",
    "description": "Customer information including demographics and segmentation data. Optional file for enhanced analysis.",
    "defaultFilename": "customers.csv",
    "required": false,
    "acceptedTypes": [".csv", ".xlsx"],
    "maxSize": 50
  }
]
```

## Analysis Scripts (scripts/)

Analysis scripts are Python files that perform data processing, analysis, and visualization.

### Metadata Format (scripts/metadata.json)

```json
[
  {
    "id": "unique_script_id",
    "title": "Script Display Name", 
    "description": "What this script does",
    "filename": "script_file.py",
    "category": "analysis|visualization|processing",
    "dependencies": []
  }
]
```

### Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for the script |
| `title` | string | Yes | Human-readable name |
| `description` | string | Yes | What the script accomplishes |
| `filename` | string | Yes | Python file name in scripts/ directory |
| `category` | string | No | Script category for organization |
| `dependencies` | array | No | File dependencies (currently unused) |

### Python Script Guidelines

Your Python scripts run in a Pyodide environment with these packages available:

- **Data**: `pandas`, `numpy`, `pyarrow` (for parquet)
- **Visualization**: `matplotlib`, `plotly`, `seaborn`
- **Analysis**: `scipy`, `scikit-learn`, `statsmodels`
- **Geospatial**: `geopandas`, `shapely`, `pyproj`, `fiona`

### Script Template

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Load data from uploaded files
# File data is automatically available based on file requirements

def main():
    """Main analysis function"""
    
    # Load the data
    # Replace 'sales_data' with your file requirement ID
    df = pd.read_csv('sales_data.csv')  
    
    # Perform analysis
    summary_stats = df.describe()
    print("Dataset Summary:")
    print(summary_stats)
    
    # Create visualization
    plt.figure(figsize=(10, 6))
    df['revenue'].hist(bins=30)
    plt.title('Revenue Distribution')
    plt.xlabel('Revenue')
    plt.ylabel('Frequency')
    plt.show()
    
    # Return results
    return {
        'total_records': len(df),
        'total_revenue': df['revenue'].sum(),
        'avg_revenue': df['revenue'].mean()
    }

if __name__ == "__main__":
    results = main()
    print(f"Analysis complete: {results}")
```

### Best Practices for Scripts

1. **Use descriptive variable names** and add comments
2. **Handle missing data gracefully** with try/catch blocks
3. **Print progress updates** for long-running operations
4. **Create meaningful visualizations** with proper labels
5. **Return structured results** when possible

## Schema Validations (schemas/)

Schema validations check data quality, structure, and business rules.

### Metadata Format (schemas/metadata.json)

```json
[
  {
    "id": "validation_id",
    "title": "Validation Name",
    "description": "What this validation checks",
    "filename": "validation_script.py",
    "category": "validation",
    "dependencies": [],
    "expectations": {
      "description": "Expected data characteristics",
      "columns": {},
      "expected_row_count": {"min": 1, "max": 1000000}
    }
  }
]
```

### Validation Script Template

```python
import pandas as pd
import json

def validate_data():
    """Validate data quality and structure"""
    
    # Load data
    df = pd.read_csv('sales_data.csv')
    
    validation_results = {
        "overall_status": "pass",
        "column_validations": [],
        "summary": {
            "total_checks": 0,
            "passed": 0, 
            "failed": 0,
            "warnings": 0
        },
        "validation_timestamp": pd.Timestamp.now().isoformat(),
        "metadata": {
            "row_count": len(df),
            "column_count": len(df.columns)
        }
    }
    
    # Check required columns
    required_columns = ['date', 'customer_id', 'product_id', 'revenue']
    for col in required_columns:
        validation_results["total_checks"] += 1
        if col in df.columns:
            validation_results["passed"] += 1
            validation_results["column_validations"].append({
                "column": col,
                "check": "required_column",
                "status": "pass",
                "message": f"Column '{col}' is present"
            })
        else:
            validation_results["failed"] += 1 
            validation_results["overall_status"] = "fail"
            validation_results["column_validations"].append({
                "column": col,
                "check": "required_column", 
                "status": "fail",
                "message": f"Required column '{col}' is missing"
            })
    
    # Update summary counts
    validation_results["summary"]["total_checks"] = validation_results["total_checks"]
    validation_results["summary"]["passed"] = validation_results["passed"] 
    validation_results["summary"]["failed"] = validation_results["failed"]
    
    # Output results as JSON for the application to parse
    print(json.dumps(validation_results))
    
    return validation_results

if __name__ == "__main__":
    validate_data()
```

## Best Practices

### Package Organization

1. **Use semantic versioning** for your packages (e.g., 1.0.0, 1.1.0, 2.0.0)
2. **Keep packages focused** - one package per analysis domain
3. **Document dependencies** clearly in descriptions
4. **Test your packages** before distribution

### File Requirements

1. **Provide clear descriptions** of expected file contents
2. **Use realistic file size limits** based on your analysis needs  
3. **Support multiple formats** when possible (CSV + Parquet)
4. **Make non-essential files optional** to reduce barriers

### Scripts and Validations

1. **Handle errors gracefully** and provide helpful messages
2. **Use meaningful output** that helps users understand results
3. **Keep scripts modular** and focused on single tasks
4. **Document expected data formats** in script comments

### Performance

1. **Optimize for typical data sizes** in your domain
2. **Use efficient pandas operations** (vectorization over loops)
3. **Consider memory usage** for large datasets
4. **Provide progress indicators** for long operations

## Validation Rules

Configuration packages are validated when loaded. Common validation errors include:

### Package Structure Errors

- **Missing package.json**: Every package must have metadata
- **Invalid JSON**: All JSON files must be valid and parseable  
- **Missing referenced files**: Scripts/schemas referenced in metadata must exist

### Metadata Errors

- **Missing required fields**: name, version, description are mandatory
- **Invalid version format**: Use semantic versioning (X.Y.Z)
- **Duplicate IDs**: All script and schema IDs must be unique within the package

### Script Errors

- **Invalid Python syntax**: Scripts must be valid Python files
- **Missing dependencies**: Referenced files must be defined in file requirements
- **Circular dependencies**: Scripts cannot have circular dependency chains

## Troubleshooting

### Common Issues

**Q: Package upload fails with "Package validation failed"**
A: Check that your package.json has all required fields (name, version, description) and that all referenced files exist.

**Q: Scripts fail to execute**  
A: Ensure your Python scripts have valid syntax and handle file loading correctly. Check that file requirement IDs match your script's file access code.

**Q: Files not recognized during upload**
A: Verify that your file requirement `defaultFilename` matches the uploaded file name (case-sensitive) or that the file extension is in `acceptedTypes`.

**Q: Validation scripts don't show results**
A: Validation scripts must output JSON with the expected schema structure. Check that your validation function prints the results JSON.

### Debug Tips

1. **Test packages locally** using the provided Python scripts
2. **Check browser console** for detailed error messages
3. **Validate JSON files** using online JSON validators
4. **Start with minimal examples** and add complexity gradually

## Examples

### Minimal Example Package

A basic configuration package with one file requirement and one analysis script:

```
minimal-example.zip
├── package.json
├── files/
│   └── requirements.json
└── scripts/
    ├── metadata.json
    └── basic_summary.py
```

**package.json:**
```json
{
  "name": "minimal-example",
  "version": "1.0.0",
  "description": "Minimal example configuration package"
}
```

**files/requirements.json:**
```json
[
  {
    "id": "data",
    "title": "Data File",
    "description": "CSV file with data to analyze",
    "defaultFilename": "data.csv", 
    "required": true,
    "acceptedTypes": [".csv"]
  }
]
```

**scripts/metadata.json:**
```json
[
  {
    "id": "summary",
    "title": "Data Summary", 
    "description": "Basic statistical summary of the data",
    "filename": "basic_summary.py",
    "category": "analysis"
  }
]
```

**scripts/basic_summary.py:**
```python
import pandas as pd

df = pd.read_csv('data.csv')
print(f"Rows: {len(df)}")
print(f"Columns: {len(df.columns)}")
print("\nColumn Summary:")
print(df.describe())
```

### Complete Example Package

See the included example packages (`default-config-package.zip` and `test-analysis-config.zip`) for comprehensive examples with multiple scripts, validations, and file requirements.

---

## Getting Help

- Check the [Configuration Plugin](../src/plugins/configuration/) landing page for quick reference
- Review example packages in the `/temp/` directory  
- Refer to the [main README](../README.md) for development setup
- Use the browser developer console for detailed error messages

## Contributing

To improve this documentation:

1. Test the instructions with real packages
2. Add missing examples or edge cases
3. Submit issues for unclear sections
4. Propose additional validation rules or best practices