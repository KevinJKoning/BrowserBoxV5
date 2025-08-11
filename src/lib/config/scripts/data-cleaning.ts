import type { Script } from '../script-config';

export const dataCleaningScript: Script = {
	id: "data-cleaning",
	title: "Data Cleaning & Preprocessing", 
	description: "Clean and preprocess data by handling missing values, outliers, and data type conversions.",
	filename: "data_cleaning.py",
	dependencies: [
		{
			type: 'uploaded',
			sourceId: 'random_data'
		}
	],
	content: `import pandas as pd
import numpy as np
import os

def clean_data(file_path, output_path=None):
    """Clean and preprocess a dataset."""
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            return None
            
        # Read the data
        if file_path.endswith('.parquet'):
            df = pd.read_parquet(file_path)
        elif file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
        else:
            raise ValueError("Unsupported file format")
        
        print(f"Original dataset shape: {df.shape}")
        original_rows = len(df)
        
        # 1. Handle missing values
        print("\\nHandling missing values...")
        missing_before = df.isnull().sum().sum()
        
        # Fill numeric columns with median
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        for col in numeric_cols:
            if df[col].isnull().sum() > 0:
                median_val = df[col].median()
                df[col].fillna(median_val, inplace=True)
                print(f"  Filled {col} missing values with median: {median_val:.2f}")
        
        # Fill categorical columns with mode
        categorical_cols = df.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            if df[col].isnull().sum() > 0:
                mode_value = df[col].mode()
                if len(mode_value) > 0:
                    df[col].fillna(mode_value[0], inplace=True)
                    print(f"  Filled {col} missing values with mode: {mode_value[0]}")
        
        missing_after = df.isnull().sum().sum()
        print(f"Missing values: {missing_before} → {missing_after}")
        
        # 2. Remove duplicates
        print("\\nRemoving duplicates...")
        duplicates_before = df.duplicated().sum()
        df = df.drop_duplicates()
        duplicates_removed = duplicates_before
        print(f"Duplicates removed: {duplicates_removed}")
        
        # 3. Handle outliers (using IQR method)
        print("\\nHandling outliers...")
        outliers_capped = 0
        for col in numeric_cols:
            Q1 = df[col].quantile(0.25)
            Q3 = df[col].quantile(0.75)
            IQR = Q3 - Q1
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            
            outliers_count = ((df[col] < lower_bound) | (df[col] > upper_bound)).sum()
            if outliers_count > 0:
                # Cap outliers instead of removing them
                df[col] = df[col].clip(lower=lower_bound, upper=upper_bound)
                outliers_capped += outliers_count
                print(f"  Capped {outliers_count} outliers in {col}")
        
        print(f"Total outliers capped: {outliers_capped}")
        
        # 4. Data summary after cleaning
        print("\\nCleaned data summary:")
        print(f"Final shape: {df.shape}")
        memory_usage = df.memory_usage(deep=True).sum() / 1024**2
        print(f"Memory usage: {memory_usage:.2f} MB")
        
        # Save cleaned data if output path provided
        if output_path:
            df.to_parquet(output_path, index=False)
            print(f"\\nCleaned data saved to: {output_path}")
        
        return {
            'original_rows': original_rows,
            'final_rows': len(df),
            'missing_values_fixed': missing_before - missing_after,
            'duplicates_removed': duplicates_removed,
            'outliers_capped': outliers_capped,
            'memory_usage_mb': memory_usage
        }
        
    except Exception as e:
        import traceback
        print(f"Error: {str(e)}")
        print(traceback.format_exc())
        return None

# Auto-detect and clean available data files
print("Looking for data files to clean...")
data_dir = "/data"
if os.path.exists(data_dir):
    files = [f for f in os.listdir(data_dir) if f.endswith(('.parquet', '.csv'))]
    if files:
        print(f"Found {len(files)} data file(s): {files}")
        
        # Clean the first file found
        file_to_clean = os.path.join(data_dir, files[0])
        print(f"\\nCleaning: {files[0]}")
        print("="*60)
        
        # Create output filename
        base_name = os.path.splitext(files[0])[0]
        output_file = os.path.join(data_dir, f"{base_name}_cleaned.parquet")
        
        result = clean_data(file_to_clean, output_file)
        if result:
            print(f"\\nData cleaning complete for {files[0]}!")
            print(f"✓ Processed {result['final_rows']:,} rows")
            print(f"✓ Fixed {result['missing_values_fixed']} missing values")
            print(f"✓ Removed {result['duplicates_removed']} duplicates")
            print(f"✓ Capped {result['outliers_capped']} outliers")
    else:
        print("No .parquet or .csv files found in /data directory")
else:
    print("No /data directory found. Please upload some data files first!")
    print("Tip: Upload parquet files using the file upload feature")`,
	category: "preprocessing"
};