# Bundled Data Example Configuration Package

This example demonstrates the new simplified configuration package format with:

## Key Features

### 1. **Bundled Data Files** (`/data/` directory)
- `sample_sales.csv` - Pre-included sales transaction data
- `customer_info.csv` - Pre-included customer demographic data
- Files automatically populate script requirements on package load
- Users can still replace bundled files with their own data

### 2. **Embedded File Requirements** (in script metadata)
- File requirements are now embedded directly in script definitions
- No separate `/files/requirements.json` needed
- Filename-based matching: script needs "sample_sales.csv" → looks for that exact file
- Single file type per requirement (simplified from multiple accepted types)

### 3. **Self-Contained Analysis**
- Package works immediately without requiring user file uploads
- Complete end-to-end analysis capability
- Perfect for AI/LLM-generated packages that include data + analysis

## Package Structure

```
bundled-data-example.zip
├── package.json                    # Package metadata
├── data/                          # NEW: Pre-bundled data files
│   ├── sample_sales.csv           # Auto-populates "sample_sales.csv" requirement
│   └── customer_info.csv          # Auto-populates "customer_info.csv" requirement
├── scripts/
│   ├── metadata.json              # NEW: Embedded file requirements
│   ├── sales_analysis.py          # Analysis script using bundled data
│   └── customer_analysis.py       # Multi-file analysis script
└── schemas/
    ├── metadata.json              # Schema definitions
    └── sales_validation.py        # Data validation script
```

## Script Examples

### Sales Analysis Script
- **Requirements**: `sample_sales.csv`
- **Auto-populated**: Yes (from bundled data)
- **Features**: Revenue analysis, customer insights, product performance
- **Output**: Comprehensive sales report with visualizations

### Customer Analysis Script  
- **Requirements**: Both `customer_info.csv` and `sample_sales.csv`
- **Auto-populated**: Yes (both files from bundled data)
- **Features**: Customer segmentation, lifetime value, demographic analysis
- **Output**: Customer behavior insights with charts

## How It Works

1. **Package Load**: Config loader extracts file requirements from all scripts
2. **Auto-Population**: Bundled data files automatically satisfy matching requirements
3. **User Experience**: Files appear as "uploaded" and can be replaced normally
4. **Script Execution**: Scripts receive whatever files are active (bundled or user-replaced)

## Benefits for AI/LLM Tools

- **Complete Packages**: Create fully self-contained analysis packages
- **No Upload Required**: Packages work immediately upon loading
- **Clear Structure**: Simple filename-based file matching
- **Flexible**: Users can still provide their own data to override bundled files

## Usage

1. Upload `bundled-data-example.zip` as a configuration package
2. File requirements are automatically populated with bundled data
3. Scripts are immediately ready to run with pre-included data
4. Optionally replace bundled files with your own data

This demonstrates how configuration packages can now include complete datasets alongside analysis scripts, enabling truly portable and self-contained analytical workflows.