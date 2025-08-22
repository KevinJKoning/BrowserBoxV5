import pandas as pd
import numpy as np
import os

def advanced_analysis():
    """Perform advanced analysis using both original data and summary report."""
    print("Advanced Analysis Report")
    print("=" * 60)
    
    # Load original data
    original_data_path = "/data/random_data.parquet"
    summary_data_path = "/data/random_data_summary_report.parquet"
    
    try:
        # Check if files exist
        if not os.path.exists(original_data_path):
            print(f"Original data not found: {original_data_path}")
            print("Please run 'Random Data Summary' script first or upload random_data.parquet")
            return None
            
        if not os.path.exists(summary_data_path):
            print(f"Summary report not found: {summary_data_path}")
            print("Please run 'Random Data Summary' script first to generate random_data_summary_report.parquet")
            return None
        
        # Load both datasets
        print("Loading datasets...")
        df_original = pd.read_parquet(original_data_path)
        df_summary = pd.read_parquet(summary_data_path)
        
        print(f"✓ Original data shape: {df_original.shape}")
        print(f"✓ Summary report metrics: {len(df_summary)} entries")
        
        # Extract key metrics from summary
        print("\nExtracting key metrics from summary...")
        metrics = {}
        for _, row in df_summary.iterrows():
            if row['numeric_value'] is not None:
                metrics[row['metric']] = row['numeric_value']
        
        # Perform advanced analysis
        print("\nAdvanced Analysis:")
        print("-" * 40)
        
        # Data quality assessment
        total_rows = metrics.get('total_rows', len(df_original))
        missing_values = metrics.get('missing_values', 0)
        data_quality_score = max(0, (total_rows - missing_values) / total_rows * 100)
        
        print(f"Data Quality Score: {data_quality_score:.1f}%")
        print(f"  - Total rows: {total_rows:,}")
        print(f"  - Missing values: {missing_values:,}")
        print(f"  - Completeness: {((total_rows - missing_values) / total_rows * 100):.1f}%")
        
        # Analyze numeric columns from original data
        numeric_cols = df_original.select_dtypes(include=[np.number]).columns
        if len(numeric_cols) > 0:
            print(f"\nNumeric Analysis ({len(numeric_cols)} columns):")
            
            # Calculate coefficient of variation for each numeric column
            cv_analysis = {}
            for col in numeric_cols:
                mean_val = df_original[col].mean()
                std_val = df_original[col].std()
                cv = (std_val / mean_val) * 100 if mean_val != 0 else 0
                cv_analysis[col] = cv
                print(f"  {col}: CV = {cv:.2f}% (variability)")
            
            # Find most and least variable columns
            if cv_analysis:
                most_variable = max(cv_analysis, key=cv_analysis.get)
                least_variable = min(cv_analysis, key=cv_analysis.get)
                print(f"\n  Most variable: {most_variable} ({cv_analysis[most_variable]:.1f}%)")
                print(f"  Least variable: {least_variable} ({cv_analysis[least_variable]:.1f}%)")
        
        # Data distribution analysis
        print("\nData Distribution Analysis:")
        if len(numeric_cols) > 0:
            for col in numeric_cols:
                col_data = df_original[col].dropna()
                if len(col_data) > 0:
                    skewness = col_data.skew()
                    kurtosis = col_data.kurtosis()
                    print(f"  {col}:")
                    print(f"    Skewness: {skewness:.3f} ({'right' if skewness > 0 else 'left' if skewness < 0 else 'symmetric'} skewed)")
                    print(f"    Kurtosis: {kurtosis:.3f} ({'heavy' if kurtosis > 0 else 'light'} tailed)")
        
        # Generate comprehensive report
        print("\nGenerating comprehensive analysis report...")
        
        analysis_results = {
            'metric': [],
            'value': [],
            'description': [],
            'category': []
        }
        
        # Add quality metrics
        quality_metrics = [
            ('data_quality_score', data_quality_score, 'Overall data quality percentage', 'quality'),
            ('completeness_ratio', (total_rows - missing_values) / total_rows, 'Data completeness ratio', 'quality'),
            ('numeric_column_count', len(numeric_cols), 'Number of numeric columns', 'structure'),
            ('total_data_points', total_rows * len(df_original.columns), 'Total data points in dataset', 'structure')
        ]
        
        for metric, value, desc, category in quality_metrics:
            analysis_results['metric'].append(metric)
            analysis_results['value'].append(value)
            analysis_results['description'].append(desc)
            analysis_results['category'].append(category)
        
        # Add variability metrics
        if cv_analysis:
            for col, cv in cv_analysis.items():
                analysis_results['metric'].append(f'{col}_coefficient_of_variation')
                analysis_results['value'].append(cv)
                analysis_results['description'].append(f'Coefficient of variation for {col}')
                analysis_results['category'].append('variability')
        
        # Create final report DataFrame
        report_df = pd.DataFrame(analysis_results)
        
        # Save advanced analysis report
        output_path = "/data/advanced_analysis_report.parquet"
        report_df.to_parquet(output_path, index=False)
        
        print(f"\n✓ Advanced analysis report saved: {output_path}")
        print(f"✓ Generated {len(report_df)} analysis metrics")
        
        # Summary
        print("\n" + "=" * 60)
        print("ADVANCED ANALYSIS SUMMARY")
        print("=" * 60)
        print(f"✓ Data Quality Score: {data_quality_score:.1f}%")
        print(f"✓ Analyzed {len(numeric_cols)} numeric columns")
        print(f"✓ Generated {len(report_df)} advanced metrics")
        if cv_analysis:
            print(f"✓ Most variable column: {most_variable}")
            print(f"✓ Least variable column: {least_variable}")
        
        return {
            'quality_score': data_quality_score,
            'metrics_generated': len(report_df),
            'numeric_columns_analyzed': len(numeric_cols),
            'report_path': output_path
        }
        
    except Exception as e:
        import traceback
        print(f"Error in advanced analysis: {str(e)}")
        print("\nFull traceback:")
        print(traceback.format_exc())
        return None

# Execute the advanced analysis
print("Starting Advanced Analysis...")
result = advanced_analysis()

if result:
    print("\n🎉 Advanced analysis completed successfully!")
else:
    print("\n❌ Advanced analysis failed. Check error messages above.")