import pandas as pd
import numpy as np
import os
import sys

def debug_pyodide_filesystem():
    """Debug function to inspect Pyodide filesystem structure"""
    print("=== PYODIDE FILESYSTEM DEBUG ===")
    
    # Show current working directory
    print(f"Current working directory: {os.getcwd()}")
    
    # Show Python path
    print(f"Python executable: {sys.executable}")
    print(f"Python version: {sys.version}")
    
    # List root directories
    print("\nRoot directory contents:")
    try:
        for item in sorted(os.listdir('/')):
            path = os.path.join('/', item)
            is_dir = os.path.isdir(path)
            print(f"  {'[DIR]' if is_dir else '[FILE]'} /{item}")
    except Exception as e:
        print(f"  Error listing root: {e}")
    
    # Check common data paths
    data_paths = ['/data', './data', 'data', '/tmp', './']
    
    for data_path in data_paths:
        print(f"\nChecking path: {data_path}")
        try:
            if os.path.exists(data_path):
                print(f"  ✓ Path exists")
                if os.path.isdir(data_path):
                    files = os.listdir(data_path)
                    print(f"  Contents ({len(files)} items):")
                    for f in sorted(files)[:10]:  # Show first 10 files
                        full_path = os.path.join(data_path, f)
                        size = os.path.getsize(full_path) if os.path.isfile(full_path) else 0
                        file_type = '[DIR]' if os.path.isdir(full_path) else f'[FILE {size}B]'
                        print(f"    {file_type} {f}")
                    if len(files) > 10:
                        print(f"    ... and {len(files) - 10} more items")
            else:
                print(f"  ✗ Path does not exist")
        except Exception as e:
            print(f"  ✗ Error accessing {data_path}: {e}")
    
    # Check file access with different path formats
    test_files = ['random_data.parquet', 'data.csv', 'sample_sales.csv']
    path_formats = [
        lambda f: f,           # relative
        lambda f: f'./{f}',    # explicit relative  
        lambda f: f'/data/{f}', # absolute /data
        lambda f: os.path.join('data', f), # os.path.join
    ]
    
    print(f"\nTesting file access patterns:")
    for test_file in test_files:
        print(f"\nTesting file: {test_file}")
        for i, path_func in enumerate(path_formats):
            path = path_func(test_file)
            try:
                exists = os.path.exists(path)
                readable = os.access(path, os.R_OK) if exists else False
                size = os.path.getsize(path) if exists else 0
                print(f"  Format {i+1} ({path}): {'✓' if exists else '✗'} exists, {'✓' if readable else '✗'} readable, {size}B")
            except Exception as e:
                print(f"  Format {i+1} ({path}): ✗ Error - {e}")

def summarize_random_data():
    """Generate summary statistics for random_data.parquet."""
    
    # Run filesystem debug first
    debug_pyodide_filesystem()
    
    file_path = "/data/random_data.parquet"
    
    try:
        # Check if the specific file exists
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            print("Please upload random_data.parquet using the 'Random Data File' upload.")
            return None
            
        # Read the parquet file
        print(f"Loading: {file_path}")
        df = pd.read_parquet(file_path)
        
        # Basic info
        print(f"\nDataset Shape: {df.shape}")
        print(f"Memory Usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
        print("\n" + "="*50)
        
        # Column information
        print("COLUMN INFORMATION")
        print("="*50)
        print(f"Total columns: {len(df.columns)}")
        print(f"Column names: {list(df.columns)}")
        
        # Data types
        print("\n" + "="*30)
        print("DATA TYPES")
        print("="*30)
        for col, dtype in df.dtypes.items():
            print(f"{col}: {dtype}")
        
        # Summary statistics for numeric columns
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        if len(numeric_cols) > 0:
            print("\n" + "="*40)
            print("NUMERIC SUMMARY STATISTICS")
            print("="*40)
            print(df[numeric_cols].describe())
        
        # Missing values check
        print("\n" + "="*30)
        print("MISSING VALUES")
        print("="*30)
        missing = df.isnull().sum()
        total_missing = missing.sum()
        if total_missing > 0:
            print(f"Total missing values: {total_missing}")
            for col, count in missing[missing > 0].items():
                print(f"  {col}: {count} missing ({count/len(df)*100:.1f}%)")
        else:
            print("✓ No missing values found!")
        
        # Sample data preview
        print("\n" + "="*30)
        print("DATA PREVIEW (First 5 rows)")
        print("="*30)
        print(df.head())
        
        # Final summary
        print("\n" + "="*50)
        print("ANALYSIS SUMMARY")
        print("="*50)
        print(f"✓ Successfully analyzed random_data.parquet")
        print(f"✓ Rows: {len(df):,}")
        print(f"✓ Columns: {len(df.columns)}")
        print(f"✓ Numeric columns: {len(numeric_cols)}")
        print(f"✓ Memory usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
        print(f"✓ Missing values: {total_missing:,}")
        
        # Create summary dataframe and save as parquet
        print("\n" + "="*40)
        print("GENERATING SUMMARY REPORT")
        print("="*40)
        
        # Create comprehensive summary data with proper typing
        summary_data = {
            'metric': [],
            'numeric_value': [],
            'text_value': [],
            'description': []
        }
        
        # Add basic statistics
        basic_stats = [
            ('total_rows', len(df), None, 'Total number of rows in dataset'),
            ('total_columns', len(df.columns), None, 'Total number of columns in dataset'),
            ('numeric_columns', len(numeric_cols), None, 'Number of numeric columns'),
            ('memory_usage_mb', round(df.memory_usage(deep=True).sum() / 1024**2, 2), None, 'Memory usage in megabytes'),
            ('missing_values', int(total_missing), None, 'Total missing values across all columns')
        ]
        
        for metric, num_val, text_val, desc in basic_stats:
            summary_data['metric'].append(metric)
            summary_data['numeric_value'].append(num_val)
            summary_data['text_value'].append(text_val)
            summary_data['description'].append(desc)
        
        # Add column-specific statistics
        for col in df.columns:
            col_data = df[col]
            dtype_str = str(col_data.dtype)
            missing_count = int(col_data.isnull().sum())
            
            # Basic column info
            summary_data['metric'].append(f'column_{col}_type')
            summary_data['numeric_value'].append(None)
            summary_data['text_value'].append(dtype_str)
            summary_data['description'].append(f'Data type of column: {col}')
            
            summary_data['metric'].append(f'column_{col}_missing')
            summary_data['numeric_value'].append(missing_count)
            summary_data['text_value'].append(None)
            summary_data['description'].append(f'Missing values in column: {col}')
            
            # For numeric columns, add statistical measures
            if col in numeric_cols:
                stats = [
                    (f'column_{col}_mean', round(float(col_data.mean()), 4), f'Mean value of column: {col}'),
                    (f'column_{col}_std', round(float(col_data.std()), 4), f'Standard deviation of column: {col}'),
                    (f'column_{col}_min', round(float(col_data.min()), 4), f'Minimum value of column: {col}'),
                    (f'column_{col}_max', round(float(col_data.max()), 4), f'Maximum value of column: {col}')
                ]
                
                for metric, value, desc in stats:
                    summary_data['metric'].append(metric)
                    summary_data['numeric_value'].append(value)
                    summary_data['text_value'].append(None)
                    summary_data['description'].append(desc)
        
        # Create summary DataFrame with proper types
        summary_df = pd.DataFrame(summary_data)
        
        # Save summary as parquet file
        output_path = "/data/random_data_summary_report.parquet"
        summary_df.to_parquet(output_path, index=False)
        print(f"✓ Summary report saved to: {output_path}")
        print(f"✓ Report contains {len(summary_df)} metrics")
        
        return {
            'rows': len(df),
            'columns': len(df.columns),
            'numeric_columns': len(numeric_cols),
            'memory_mb': df.memory_usage(deep=True).sum() / 1024**2,
            'missing_values': total_missing,
            'summary_report_path': output_path,
            'summary_metrics': len(summary_df)
        }
        
    except Exception as e:
        import traceback
        print(f"Error analyzing random_data.parquet: {str(e)}")
        print("\nFull traceback:")
        print(traceback.format_exc())
        return None

# Execute the analysis
print("Random Data Analysis Script")
print("="*60)
result = summarize_random_data()

if result:
    print("\n🎉 Analysis completed successfully!")
else:
    print("\n❌ Analysis failed. Check error messages above.")