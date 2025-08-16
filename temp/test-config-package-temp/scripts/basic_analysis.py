import pandas as pd
import numpy as np
import os

def analyze_sales_data():
    """Basic sales data analysis."""
    file_path = "/data/sales_data.csv"
    
    try:
        if not os.path.exists(file_path):
            print(f"Sales data file not found: {file_path}")
            print("Please upload sales_data.csv using the 'Sales Data' upload.")
            return None
            
        print(f"Loading sales data from: {file_path}")
        df = pd.read_csv(file_path)
        
        print(f"\nSales Data Overview:")
        print(f"==================")
        print(f"Total records: {len(df)}")
        print(f"Columns: {list(df.columns)}")
        print(f"Date range: {df['date'].min() if 'date' in df.columns else 'N/A'} to {df['date'].max() if 'date' in df.columns else 'N/A'}")
        
        # Basic statistics
        if 'amount' in df.columns:
            print(f"\nSales Summary:")
            print(f"=============")
            print(f"Total sales: ${df['amount'].sum():,.2f}")
            print(f"Average sale: ${df['amount'].mean():.2f}")
            print(f"Median sale: ${df['amount'].median():.2f}")
            print(f"Max sale: ${df['amount'].max():,.2f}")
            print(f"Min sale: ${df['amount'].min():.2f}")
            
            # Create summary report
            summary = {
                'total_records': len(df),
                'total_sales': float(df['amount'].sum()),
                'average_sale': float(df['amount'].mean()),
                'median_sale': float(df['amount'].median()),
                'max_sale': float(df['amount'].max()),
                'min_sale': float(df['amount'].min())
            }
            
            # Save summary as CSV
            summary_df = pd.DataFrame([summary])
            output_path = "/data/sales_summary.csv"
            summary_df.to_csv(output_path, index=False)
            print(f"\n✓ Sales summary saved to: {output_path}")
            
        print(f"\n✓ Analysis completed successfully!")
        return True
        
    except Exception as e:
        print(f"Error analyzing sales data: {str(e)}")
        return None

# Execute the analysis
print("Basic Sales Analysis")
print("=" * 40)
result = analyze_sales_data()

if result:
    print("\n🎉 Sales analysis completed!")
else:
    print("\n❌ Sales analysis failed.")