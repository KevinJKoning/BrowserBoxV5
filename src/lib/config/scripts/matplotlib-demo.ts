import type { Script } from '../script-config';

export const matplotlibDemoScript: Script = {
	id: "matplotlib-demo",
	title: "Matplotlib Demo",
	description: "Create beautiful data visualizations using matplotlib with sample data.",
	filename: "matplotlib_demo.py",
	dependencies: [
		{
			type: 'uploaded',
			sourceId: 'random_data'
		}
	],
	content: `import matplotlib
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import os
import io
import base64

# Set matplotlib to use a non-interactive backend
matplotlib.use('Agg')

def create_matplotlib_visualizations(file_path):
    """Create matplotlib visualizations and save them as HTML report."""
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
        
        print(f"Creating matplotlib visualizations for: {os.path.basename(file_path)}")
        print("="*60)
        print(f"Dataset shape: {df.shape}")
        
        # Get numeric columns for plotting
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        categorical_cols = df.select_dtypes(include=['object', 'category']).columns
        
        print(f"Found {len(numeric_cols)} numeric columns: {list(numeric_cols)}")
        print(f"Found {len(categorical_cols)} categorical columns: {list(categorical_cols)}")
        
        # Function to convert matplotlib figure to base64 string
        def fig_to_base64(fig):
            img_buffer = io.BytesIO()
            fig.savefig(img_buffer, format='png', dpi=100, bbox_inches='tight', 
                       facecolor='white', edgecolor='none')
            img_buffer.seek(0)
            img_base64 = base64.b64encode(img_buffer.getvalue()).decode()
            plt.close(fig)  # Close figure to free memory
            return img_base64
        
        # Store chart images
        charts = {}
        
        # Chart 1: Summary statistics visualization
        print("\\nCreating Chart 1: Dataset Overview...")
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(12, 10))
        fig.suptitle(f'Dataset Overview: {os.path.basename(file_path)}', fontsize=16, fontweight='bold')
        
        # Basic stats
        stats = {
            'Total Rows': len(df),
            'Total Columns': len(df.columns),
            'Numeric Columns': len(numeric_cols),
            'Categorical Columns': len(categorical_cols)
        }
        
        ax1.bar(stats.keys(), stats.values(), color=['#3498db', '#e74c3c', '#2ecc71', '#f39c12'])
        ax1.set_title('Dataset Statistics', fontweight='bold')
        ax1.set_ylabel('Count')
        for i, v in enumerate(stats.values()):
            ax1.text(i, v + max(stats.values())*0.01, str(v), ha='center', va='bottom', fontweight='bold')
        
        # Memory usage by column type
        memory_info = df.memory_usage(deep=True)
        ax2.pie([memory_info[numeric_cols].sum(), memory_info[categorical_cols].sum()], 
                labels=['Numeric', 'Categorical'], autopct='%1.1f%%', 
                colors=['#3498db', '#e74c3c'])
        ax2.set_title('Memory Usage by Column Type', fontweight='bold')
        
        # Null values
        null_counts = df.isnull().sum()
        top_nulls = null_counts.nlargest(10)
        if len(top_nulls) > 0 and top_nulls.max() > 0:
            ax3.barh(range(len(top_nulls)), top_nulls.values, color='#e74c3c')
            ax3.set_yticks(range(len(top_nulls)))
            ax3.set_yticklabels(top_nulls.index)
            ax3.set_title('Top 10 Columns with Missing Values', fontweight='bold')
            ax3.set_xlabel('Number of Missing Values')
        else:
            ax3.text(0.5, 0.5, 'No Missing Values\\nDetected! 🎉', 
                    ha='center', va='center', transform=ax3.transAxes,
                    fontsize=14, fontweight='bold', color='#2ecc71')
            ax3.set_title('Missing Values Check', fontweight='bold')
        
        # Data types distribution
        dtype_counts = df.dtypes.value_counts()
        ax4.pie(dtype_counts.values, labels=dtype_counts.index, autopct='%1.1f%%',
                colors=plt.cm.Set3(np.linspace(0, 1, len(dtype_counts))))
        ax4.set_title('Data Types Distribution', fontweight='bold')
        
        plt.tight_layout()
        charts['overview'] = fig_to_base64(fig)
        
        # Chart 2: Numeric columns analysis (if available)
        if len(numeric_cols) > 0:
            print("Creating Chart 2: Numeric Columns Analysis...")
            n_cols = min(4, len(numeric_cols))  # Show up to 4 columns
            fig, axes = plt.subplots(2, n_cols, figsize=(4*n_cols, 8))
            if n_cols == 1:
                axes = axes.reshape(2, 1)
            elif len(axes.shape) == 1:
                axes = axes.reshape(1, -1)
            
            fig.suptitle('Numeric Columns Analysis', fontsize=16, fontweight='bold')
            
            for i, col in enumerate(numeric_cols[:n_cols]):
                # Histogram
                axes[0, i].hist(df[col].dropna(), bins=30, alpha=0.7, color='#3498db', edgecolor='black')
                axes[0, i].set_title(f'{col} - Distribution', fontweight='bold')
                axes[0, i].set_xlabel('Value')
                axes[0, i].set_ylabel('Frequency')
                
                # Box plot
                axes[1, i].boxplot(df[col].dropna(), patch_artist=True, 
                                  boxprops=dict(facecolor='#2ecc71', alpha=0.7))
                axes[1, i].set_title(f'{col} - Box Plot', fontweight='bold')
                axes[1, i].set_ylabel('Value')
                
                # Add statistics text
                stats_text = f'Mean: {df[col].mean():.2f}\\nStd: {df[col].std():.2f}\\nMin: {df[col].min():.2f}\\nMax: {df[col].max():.2f}'
                axes[0, i].text(0.02, 0.98, stats_text, transform=axes[0, i].transAxes, 
                               verticalalignment='top', bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
            
            plt.tight_layout()
            charts['numeric_analysis'] = fig_to_base64(fig)
        
        # Chart 3: Correlation heatmap (if we have multiple numeric columns)
        if len(numeric_cols) > 1:
            print("Creating Chart 3: Correlation Heatmap...")
            fig, ax = plt.subplots(figsize=(10, 8))
            
            # Calculate correlation matrix
            corr_matrix = df[numeric_cols].corr()
            
            # Create heatmap
            im = ax.imshow(corr_matrix, cmap='RdBu_r', aspect='auto', vmin=-1, vmax=1)
            
            # Set ticks and labels
            ax.set_xticks(range(len(numeric_cols)))
            ax.set_yticks(range(len(numeric_cols)))
            ax.set_xticklabels(numeric_cols, rotation=45, ha='right')
            ax.set_yticklabels(numeric_cols)
            
            # Add correlation values as text
            for i in range(len(numeric_cols)):
                for j in range(len(numeric_cols)):
                    text = ax.text(j, i, f'{corr_matrix.iloc[i, j]:.2f}',
                                 ha="center", va="center", color="black" if abs(corr_matrix.iloc[i, j]) < 0.5 else "white",
                                 fontweight='bold')
            
            ax.set_title("Correlation Matrix - Numeric Columns", fontsize=14, fontweight='bold', pad=20)
            
            # Add colorbar
            cbar = plt.colorbar(im, ax=ax)
            cbar.set_label('Correlation Coefficient', rotation=270, labelpad=20)
            
            plt.tight_layout()
            charts['correlation'] = fig_to_base64(fig)
        
        # Chart 4: Sample data visualization (scatter plot or line plot)
        if len(numeric_cols) >= 2:
            print("Creating Chart 4: Data Relationship Plot...")
            fig, ax = plt.subplots(figsize=(10, 6))
            
            col1, col2 = numeric_cols[0], numeric_cols[1]
            
            # Create scatter plot
            scatter = ax.scatter(df[col1], df[col2], alpha=0.6, c=range(len(df)), 
                               cmap='viridis', s=50, edgecolors='black', linewidth=0.5)
            
            ax.set_xlabel(col1, fontsize=12, fontweight='bold')
            ax.set_ylabel(col2, fontsize=12, fontweight='bold')
            ax.set_title(f'Relationship: {col1} vs {col2}', fontsize=14, fontweight='bold')
            
            # Add colorbar
            cbar = plt.colorbar(scatter, ax=ax)
            cbar.set_label('Data Point Index', rotation=270, labelpad=20)
            
            # Add trend line
            z = np.polyfit(df[col1].dropna(), df[col2].dropna(), 1)
            p = np.poly1d(z)
            ax.plot(df[col1], p(df[col1]), "r--", alpha=0.8, linewidth=2, label=f'Trend Line')
            ax.legend()
            
            plt.tight_layout()
            charts['relationship'] = fig_to_base64(fig)
        
        # Generate HTML report with embedded charts
        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matplotlib Visualization Report - {os.path.basename(file_path)}</title>
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
        .chart-container {{
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            border: 2px solid #e9ecef;
        }}
        .chart-container img {{
            max-width: 100%;
            height: auto;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            border-radius: 8px;
        }}
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
        <h1>📊 Matplotlib Visualization Report</h1>
        <p style="text-align: center; font-size: 1.2em; color: #6c757d;">
            Interactive data analysis of <strong>{os.path.basename(file_path)}</strong>
        </p>
        
        <h2>📈 Dataset Quick Stats</h2>
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
        </div>"""
        
        # Add charts to HTML
        if 'overview' in charts:
            html_content += f"""
        <h2>📋 Dataset Overview</h2>
        <div class="chart-container">
            <img src="data:image/png;base64,{charts['overview']}" alt="Dataset Overview Chart">
            <p style="margin-top: 10px; color: #6c757d; font-size: 0.9em;">
                Comprehensive overview showing dataset statistics, memory usage, missing values, and data types.
            </p>
        </div>"""
        
        if 'numeric_analysis' in charts:
            html_content += f"""
        <h2>🔢 Numeric Columns Analysis</h2>
        <div class="chart-container">
            <img src="data:image/png;base64,{charts['numeric_analysis']}" alt="Numeric Analysis Chart">
            <p style="margin-top: 10px; color: #6c757d; font-size: 0.9em;">
                Distribution histograms and box plots for numeric columns showing data spread and outliers.
            </p>
        </div>"""
        
        if 'correlation' in charts:
            html_content += f"""
        <h2>🔗 Correlation Analysis</h2>
        <div class="chart-container">
            <img src="data:image/png;base64,{charts['correlation']}" alt="Correlation Heatmap">
            <p style="margin-top: 10px; color: #6c757d; font-size: 0.9em;">
                Correlation heatmap showing relationships between numeric variables (blue = positive, red = negative).
            </p>
        </div>"""
        
        if 'relationship' in charts:
            html_content += f"""
        <h2>📈 Data Relationships</h2>
        <div class="chart-container">
            <img src="data:image/png;base64,{charts['relationship']}" alt="Relationship Plot">
            <p style="margin-top: 10px; color: #6c757d; font-size: 0.9em;">
                Scatter plot with trend line showing the relationship between two key variables.
            </p>
        </div>"""
        
        html_content += f"""
        <div class="footer">
            <p>Report generated using matplotlib on {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            <p>Dataset: {os.path.basename(file_path)} | Rows: {len(df):,} | Columns: {len(df.columns)} | Charts: {len(charts)}</p>
            <p>🎨 Powered by matplotlib, pandas, and numpy</p>
        </div>
    </div>
</body>
</html>"""
        
        # Save HTML file
        output_path = "/data/matplotlib_visualization_report.html"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"✓ Matplotlib HTML report saved: {output_path}")
        print(f"✓ Generated {len(charts)} interactive charts")
        print(f"✓ Analyzed {len(numeric_cols)} numeric columns")
        print("✓ Charts include: dataset overview, distributions, correlations, and relationships")
        
        return {
            'total_columns': len(df.columns),
            'numeric_columns': len(numeric_cols),
            'categorical_columns': len(categorical_cols),
            'total_rows': len(df),
            'charts_generated': len(charts),
            'output_path': output_path
        }
        
    except Exception as e:
        import traceback
        print(f"Error creating matplotlib visualizations: {str(e)}")
        print(traceback.format_exc())
        return None

# Auto-detect and create matplotlib visualizations for available data files
print("🎨 Matplotlib Demo Script Starting...")
print("Looking for data files to visualize...")

data_dir = "/data"
if os.path.exists(data_dir):
    files = [f for f in os.listdir(data_dir) if f.endswith(('.parquet', '.csv', '.gpkg'))]
    if files:
        print(f"Found {len(files)} data file(s): {files}")
        
        # Create matplotlib visualizations for the first file found
        file_path = os.path.join(data_dir, files[0])
        print(f"\\nCreating matplotlib visualizations for: {files[0]}")
        print("="*60)
        
        result = create_matplotlib_visualizations(file_path)
        if result:
            print(f"\\n🎉 Matplotlib visualization report created successfully!")
            print(f"✓ File: matplotlib_visualization_report.html")
            print(f"✓ Analyzed {result['total_rows']:,} rows across {result['total_columns']} columns")
            print(f"✓ Generated {result['charts_generated']} beautiful charts")
            print("✓ Charts saved as embedded PNG images in HTML report")
        else:
            print("\\n❌ Failed to create matplotlib visualization report")
    else:
        print("No .parquet, .csv, or .gpkg files found in /data directory")
        print("Please upload a data file first to see matplotlib in action!")
        print("\\n🎨 Creating sample matplotlib demo instead...")
        
        # Create sample plots with synthetic data
        print("Generating sample data and plots...")
        
        # Create sample data
        np.random.seed(42)
        sample_data = {
            'x': np.linspace(0, 4*np.pi, 100),
            'y1': np.sin(np.linspace(0, 4*np.pi, 100)) + np.random.normal(0, 0.1, 100),
            'y2': np.cos(np.linspace(0, 4*np.pi, 100)) + np.random.normal(0, 0.1, 100),
            'category': np.random.choice(['A', 'B', 'C'], 100)
        }
        sample_df = pd.DataFrame(sample_data)
        
        # Create sample plots
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(12, 10))
        fig.suptitle('Matplotlib Demo - Sample Visualizations', fontsize=16, fontweight='bold')
        
        # Line plot
        ax1.plot(sample_df['x'], sample_df['y1'], 'b-', label='sin(x) + noise', linewidth=2)
        ax1.plot(sample_df['x'], sample_df['y2'], 'r-', label='cos(x) + noise', linewidth=2)
        ax1.set_title('Line Plot Demo', fontweight='bold')
        ax1.set_xlabel('X values')
        ax1.set_ylabel('Y values')
        ax1.legend()
        ax1.grid(True, alpha=0.3)
        
        # Scatter plot
        colors = {'A': 'red', 'B': 'blue', 'C': 'green'}
        for category in ['A', 'B', 'C']:
            mask = sample_df['category'] == category
            ax2.scatter(sample_df[mask]['y1'], sample_df[mask]['y2'], 
                       c=colors[category], label=f'Category {category}', alpha=0.7, s=50)
        ax2.set_title('Scatter Plot Demo', fontweight='bold')
        ax2.set_xlabel('Y1 values')
        ax2.set_ylabel('Y2 values')
        ax2.legend()
        ax2.grid(True, alpha=0.3)
        
        # Histogram
        ax3.hist(sample_df['y1'], bins=20, alpha=0.7, color='skyblue', edgecolor='black')
        ax3.set_title('Histogram Demo', fontweight='bold')
        ax3.set_xlabel('Y1 values')
        ax3.set_ylabel('Frequency')
        ax3.grid(True, alpha=0.3)
        
        # Bar plot
        category_counts = sample_df['category'].value_counts()
        ax4.bar(category_counts.index, category_counts.values, 
                color=['red', 'blue', 'green'], alpha=0.7, edgecolor='black')
        ax4.set_title('Bar Plot Demo', fontweight='bold')
        ax4.set_xlabel('Category')
        ax4.set_ylabel('Count')
        ax4.grid(True, alpha=0.3, axis='y')
        
        plt.tight_layout()
        
        # Save the demo plot
        output_path = "/data/matplotlib_demo.png"
        plt.savefig(output_path, dpi=150, bbox_inches='tight', 
                   facecolor='white', edgecolor='none')
        plt.close()
        
        print(f"✓ Sample matplotlib demo saved: {output_path}")
        print("✓ Demo includes: line plot, scatter plot, histogram, and bar chart")
        print("🚀 Matplotlib is working perfectly! Upload data files to see real visualizations.")
else:
    print("No /data directory found.")
    print("🎨 Creating a simple matplotlib demo...")
    
    # Create a simple demo plot
    fig, ax = plt.subplots(figsize=(10, 6))
    x = np.linspace(0, 2*np.pi, 100)
    y1 = np.sin(x)
    y2 = np.cos(x)
    
    ax.plot(x, y1, 'b-', label='sin(x)', linewidth=3)
    ax.plot(x, y2, 'r-', label='cos(x)', linewidth=3)
    ax.set_title('Matplotlib is Working! 🎉', fontsize=16, fontweight='bold')
    ax.set_xlabel('X values', fontsize=12)
    ax.set_ylabel('Y values', fontsize=12)
    ax.legend(fontsize=12)
    ax.grid(True, alpha=0.3)
    
    # Create data directory and save
    os.makedirs('/data', exist_ok=True)
    output_path = "/data/matplotlib_demo_simple.png"
    plt.savefig(output_path, dpi=150, bbox_inches='tight', 
               facecolor='white', edgecolor='none')
    plt.close()
    
    print(f"✓ Simple matplotlib demo created: {output_path}")
    print("🎨 Matplotlib is ready! Upload data files to create beautiful visualizations.")

print("\\n" + "="*60)
print("🎨 Matplotlib Demo Complete!")
print("✅ Matplotlib library is fully functional")
print("📊 Ready to create beautiful data visualizations")
print("📁 Check /data directory for generated files")
print("="*60)`,
	category: "visualization"
};