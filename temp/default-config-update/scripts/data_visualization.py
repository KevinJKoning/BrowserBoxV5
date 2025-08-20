import pandas as pd
import numpy as np
import os

def create_html_visualization_report(file_path):
    """Create an HTML visualization report for the dataset."""
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
        elif file_path.endswith('.gpkg'):
            import geopandas as gpd
            gdf = gpd.read_file(file_path)
            # Convert to regular DataFrame for analysis (drop geometry)
            df = gdf.drop(columns=['geometry']) if 'geometry' in gdf.columns else gdf
        else:
            raise ValueError("Unsupported file format. Please use .parquet, .csv, or .gpkg files.")
        
        print(f"Creating HTML visualization report for: {os.path.basename(file_path)}")
        print("="*60)
        
        # Basic dataset info
        print(f"Dataset shape: {df.shape}")
        print(f"Memory usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
        
        # Analyze columns
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        categorical_cols = df.select_dtypes(include=['object', 'category']).columns
        
        # Generate HTML content
        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Visualization Report - {os.path.basename(file_path)}</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }}
        .container {{
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }}
        h2 {{
            color: #34495e;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-top: 40px;
        }}
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }}
        .stat-card {{
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }}
        .stat-card:hover {{
            transform: translateY(-5px);
        }}
        .stat-number {{
            font-size: 2em;
            font-weight: bold;
            display: block;
        }}
        .stat-label {{
            font-size: 0.9em;
            opacity: 0.9;
        }}
        .data-table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }}
        .data-table th {{
            background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }}
        .data-table td {{
            padding: 12px 15px;
            border-bottom: 1px solid #f0f0f0;
        }}
        .data-table tr:hover {{
            background: #f8f9fa;
        }}
        .chart-placeholder {{
            background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%);
            color: white;
            padding: 40px;
            text-align: center;
            border-radius: 10px;
            margin: 20px 0;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }}
        .correlation-matrix {{
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border: 2px solid #e9ecef;
        }}
        .footer {{
            text-align: center;
            margin-top: 40px;
            color: #6c757d;
            font-style: italic;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Data Visualization Report</h1>
        <p style="text-align: center; font-size: 1.2em; color: #6c757d;">
            Analysis of <strong>{os.path.basename(file_path)}</strong>
        </p>
        
        <h2>📈 Dataset Overview</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <span class="stat-number">{len(df):,}</span>
                <span class="stat-label">Total Rows</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">{len(df.columns)}</span>
                <span class="stat-label">Total Columns</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">{len(numeric_cols)}</span>
                <span class="stat-label">Numeric Columns</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">{df.memory_usage(deep=True).sum() / 1024**2:.1f} MB</span>
                <span class="stat-label">Memory Usage</span>
            </div>
        </div>
        
        <h2>📋 Column Information</h2>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Column Name</th>
                    <th>Data Type</th>
                    <th>Non-Null Count</th>
                    <th>Null Count</th>
                    <th>Null %</th>
                </tr>
            </thead>
            <tbody>"""

        # Add column information
        for col in df.columns:
            non_null = df[col].count()
            null_count = df[col].isnull().sum()
            null_pct = (null_count / len(df)) * 100
            html_content += f"""
                <tr>
                    <td><strong>{col}</strong></td>
                    <td>{str(df[col].dtype)}</td>
                    <td>{non_null:,}</td>
                    <td>{null_count:,}</td>
                    <td>{null_pct:.1f}%</td>
                </tr>"""

        html_content += """
            </tbody>
        </table>"""

        # Add numeric statistics if we have numeric columns
        if len(numeric_cols) > 0:
            html_content += """
        <h2>🔢 Numeric Column Statistics</h2>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Column</th>
                    <th>Mean</th>
                    <th>Std Dev</th>
                    <th>Min</th>
                    <th>Max</th>
                    <th>Outliers</th>
                </tr>
            </thead>
            <tbody>"""

            for col in numeric_cols:
                mean_val = df[col].mean()
                std_val = df[col].std()
                min_val = df[col].min()
                max_val = df[col].max()
                
                # Calculate outliers using IQR method
                Q1 = df[col].quantile(0.25)
                Q3 = df[col].quantile(0.75)
                IQR = Q3 - Q1
                outliers = ((df[col] < (Q1 - 1.5 * IQR)) | (df[col] > (Q3 + 1.5 * IQR))).sum()
                
                html_content += f"""
                <tr>
                    <td><strong>{col}</strong></td>
                    <td>{mean_val:.2f}</td>
                    <td>{std_val:.2f}</td>
                    <td>{min_val:.2f}</td>
                    <td>{max_val:.2f}</td>
                    <td>{outliers} ({outliers/len(df)*100:.1f}%)</td>
                </tr>"""

            html_content += """
            </tbody>
        </table>"""

        # Add correlation analysis
        if len(numeric_cols) > 1:
            corr_matrix = df[numeric_cols].corr()
            html_content += """
        <h2>🔗 Correlation Analysis</h2>
        <div class="correlation-matrix">
            <h3>Correlation Matrix (Numeric Columns)</h3>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Column</th>"""
            
            for col in numeric_cols:
                html_content += f"<th>{col}</th>"
            
            html_content += """
                    </tr>
                </thead>
                <tbody>"""
            
            for i, col1 in enumerate(numeric_cols):
                html_content += f"<tr><td><strong>{col1}</strong></td>"
                for j, col2 in enumerate(numeric_cols):
                    corr_val = corr_matrix.iloc[i, j]
                    color_intensity = abs(corr_val)
                    if corr_val > 0:
                        bg_color = f"background: rgba(52, 152, 219, {color_intensity}); color: {'white' if color_intensity > 0.5 else 'black'};"
                    else:
                        bg_color = f"background: rgba(231, 76, 60, {color_intensity}); color: {'white' if color_intensity > 0.5 else 'black'};"
                    html_content += f'<td style="{bg_color}">{corr_val:.3f}</td>'
                html_content += "</tr>"
            
            html_content += """
                </tbody>
            </table>
        </div>"""

        # Add data preview
        html_content += f"""
        <h2>👀 Data Preview (First 10 Rows)</h2>
        <table class="data-table">
            <thead>
                <tr>"""
        
        for col in df.columns:
            html_content += f"<th>{col}</th>"
        
        html_content += """
                </tr>
            </thead>
            <tbody>"""
        
        for _, row in df.head(10).iterrows():
            html_content += "<tr>"
            for val in row:
                if pd.isna(val):
                    html_content += "<td style='color: #999; font-style: italic;'>null</td>"
                else:
                    html_content += f"<td>{val}</td>"
            html_content += "</tr>"

        # Add placeholder for future charts
        html_content += f"""
            </tbody>
        </table>
        
        <h2>📊 Interactive Charts</h2>
        <div class="chart-placeholder">
            <h3>🚀 Chart Area</h3>
            <p>This area is ready for interactive charts!</p>
            <p>Future enhancements could include:</p>
            <ul style="text-align: left; display: inline-block;">
                <li>Histograms for numeric columns</li>
                <li>Box plots for outlier visualization</li>
                <li>Scatter plots for correlation analysis</li>
                <li>Bar charts for categorical data</li>
                <li>Interactive filters and selections</li>
            </ul>
        </div>
        
        <div class="footer">
            <p>Report generated on {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            <p>Dataset: {os.path.basename(file_path)} | Rows: {len(df):,} | Columns: {len(df.columns)}</p>
        </div>
    </div>
</body>
</html>"""

        # Save HTML file
        output_path = "/data/data_visualization_report.html"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"✓ HTML visualization report saved: {output_path}")
        print(f"✓ Report includes {len(df.columns)} columns and {len(df):,} rows")
        print(f"✓ Analyzed {len(numeric_cols)} numeric columns")
        if len(numeric_cols) > 1:
            print(f"✓ Generated correlation matrix")
        
        return {
            'total_columns': len(df.columns),
            'numeric_columns': len(numeric_cols),
            'categorical_columns': len(categorical_cols),
            'total_rows': len(df),
            'output_path': output_path
        }
        
    except Exception as e:
        import traceback
        print(f"Error: {str(e)}")
        print(traceback.format_exc())
        return None

# Auto-detect and create visualizations for available data files
print("Looking for data files to visualize...")
data_dir = "/data"
if os.path.exists(data_dir):
    files = [f for f in os.listdir(data_dir) if f.endswith(('.parquet', '.csv', '.gpkg'))]
    if files:
        print(f"Found {len(files)} data file(s): {files}")
        
        # Create visualization for the first file found
        file_path = os.path.join(data_dir, files[0])
        print(f"\nCreating HTML visualization for: {files[0]}")
        print("="*60)
        
        result = create_html_visualization_report(file_path)
        if result:
            print(f"\n🎉 HTML visualization report created successfully!")
            print(f"✓ File: data_visualization_report.html")
            print(f"✓ Analyzed {result['total_rows']:,} rows")
            print(f"✓ Processed {result['total_columns']} columns")
        else:
            print("\n❌ Failed to create visualization report")
    else:
        print("No .parquet, .csv, or .gpkg files found in /data directory")
        print("Please upload a data file first!")
else:
    print("No /data directory found. Please upload some data files first!")
    print("Tip: Upload parquet files using the file upload feature")