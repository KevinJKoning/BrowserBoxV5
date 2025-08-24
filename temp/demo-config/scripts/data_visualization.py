import pandas as pd, numpy as np, os, io, base64, matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from datetime import datetime

# Set professional styling compatible with Pyodide matplotlib
plt.rcParams['figure.facecolor'] = 'white'
plt.rcParams['axes.grid'] = True
plt.rcParams['axes.edgecolor'] = 'gray'
plt.rcParams['axes.linewidth'] = 0.8
plt.rcParams['font.size'] = 10

def fig_to_base64(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format='png', dpi=150, bbox_inches='tight', facecolor='white')
    buf.seek(0)
    b64 = base64.b64encode(buf.read()).decode('ascii')
    plt.close(fig)
    return b64

fn = 'demo_numeric.parquet'
if not os.path.exists(fn):
    print('Missing data:', fn)
    raise SystemExit(0)

df = pd.read_parquet(fn)
num_cols = df.select_dtypes(include=[np.number]).columns.tolist()
rows, cols = df.shape

# Generate comprehensive statistics
stats_summary = df[num_cols].describe().round(3)
correlation_matrix = df[num_cols].corr().round(3)
missing_data = df[num_cols].isnull().sum()

# Create a comprehensive composite visualization
fig = plt.figure(figsize=(16, 12))
fig.suptitle('Data Analysis Dashboard', fontsize=20, fontweight='bold', y=0.95)

# 1. Distribution plots (top row)
for i, col in enumerate(num_cols[:3]):
    ax = plt.subplot(3, 3, i+1)
    df[col].hist(bins=30, alpha=0.7, color=f'C{i}', edgecolor='black', linewidth=0.5)
    ax.set_title(f'{col.upper()} Distribution', fontweight='bold', fontsize=12)
    ax.set_ylabel('Frequency')
    ax.grid(True)

# 2. Correlation heatmap (middle left)
ax = plt.subplot(3, 3, 4)
im = ax.imshow(correlation_matrix.values, cmap='RdYlBu_r', aspect='auto', vmin=-1, vmax=1)
ax.set_xticks(range(len(correlation_matrix.columns)))
ax.set_yticks(range(len(correlation_matrix.columns)))
ax.set_xticklabels(correlation_matrix.columns, rotation=45)
ax.set_yticklabels(correlation_matrix.columns)
# Add correlation values as text
for i in range(len(correlation_matrix.columns)):
    for j in range(len(correlation_matrix.columns)):
        text = ax.text(j, i, f'{correlation_matrix.iloc[i, j]:.2f}',
                      ha="center", va="center", color="black", fontweight='bold')
plt.colorbar(im, ax=ax, shrink=0.8)
ax.set_title('Feature Correlations', fontweight='bold', fontsize=12)

# 3. Box plots for outlier detection (middle center)
ax = plt.subplot(3, 3, 5)
bp = ax.boxplot([df[col].dropna() for col in num_cols[:3]], 
                labels=[col.upper() for col in num_cols[:3]], patch_artist=True)
for patch, color in zip(bp['boxes'], ['C0', 'C1', 'C2']):
    patch.set_facecolor(color)
    patch.set_alpha(0.7)
ax.set_title('Outlier Detection', fontweight='bold', fontsize=12)
ax.grid(True, alpha=0.3)

# 4. Scatter plot matrix (bottom row)
if len(num_cols) >= 2:
    ax = plt.subplot(3, 3, (7, 9))  # Span last row
    scatter_colors = df.index % 5  # Create color groups for visual appeal
    scatter = ax.scatter(df[num_cols[0]], df[num_cols[1]], 
                        c=scatter_colors, alpha=0.6, s=30, cmap='viridis')
    ax.set_xlabel(f'{num_cols[0].upper()}', fontweight='bold')
    ax.set_ylabel(f'{num_cols[1].upper()}', fontweight='bold')
    ax.set_title(f'{num_cols[0].upper()} vs {num_cols[1].upper()} Relationship', 
                fontweight='bold', fontsize=12)
    ax.grid(True)

plt.tight_layout()
plt.subplots_adjust(top=0.9)
composite_img = fig_to_base64(fig)

# Create summary statistics table
stats_table = stats_summary.to_html(classes='stats-table', table_id='summary-stats', escape=False)

# Generate key insights
insights = []
high_corr_pairs = []
for i, col1 in enumerate(num_cols):
    for j, col2 in enumerate(num_cols):
        if i < j and abs(correlation_matrix.loc[col1, col2]) > 0.7:
            high_corr_pairs.append((col1, col2, correlation_matrix.loc[col1, col2]))

if high_corr_pairs:
    insights.append(f"Strong correlations detected between {len(high_corr_pairs)} feature pairs")
else:
    insights.append("No strong correlations (>0.7) detected between features")

outlier_counts = [len(df[(df[col] < df[col].quantile(0.25) - 1.5 * (df[col].quantile(0.75) - df[col].quantile(0.25))) | 
                          (df[col] > df[col].quantile(0.75) + 1.5 * (df[col].quantile(0.75) - df[col].quantile(0.25)))]) 
                 for col in num_cols]
total_outliers = sum(outlier_counts)
insights.append(f"Identified {total_outliers} potential outliers across all features")

# Save professional HTML report
html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Visualization Report</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }}
        
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }}
        
        .header {{
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }}
        
        .header h1 {{
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 300;
        }}
        
        .header .subtitle {{
            font-size: 1.2em;
            opacity: 0.9;
        }}
        
        .content {{
            padding: 40px;
        }}
        
        .metrics-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }}
        
        .metric-card {{
            background: #f8f9fa;
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            border-left: 4px solid #4facfe;
            transition: transform 0.2s ease;
        }}
        
        .metric-card:hover {{
            transform: translateY(-2px);
        }}
        
        .metric-number {{
            font-size: 2.5em;
            font-weight: bold;
            color: #4facfe;
            display: block;
        }}
        
        .metric-label {{
            font-size: 0.9em;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
        }}
        
        .section {{
            margin-bottom: 40px;
        }}
        
        .section h2 {{
            font-size: 1.8em;
            margin-bottom: 20px;
            color: #2c3e50;
            border-bottom: 3px solid #4facfe;
            padding-bottom: 10px;
        }}
        
        .insights-list {{
            background: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 30px;
        }}
        
        .insights-list h3 {{
            color: #4facfe;
            margin-bottom: 15px;
            font-size: 1.3em;
        }}
        
        .insights-list ul {{
            list-style: none;
        }}
        
        .insights-list li {{
            padding: 8px 0;
            padding-left: 25px;
            position: relative;
        }}
        
        .insights-list li:before {{
            content: "→";
            position: absolute;
            left: 0;
            color: #4facfe;
            font-weight: bold;
        }}
        
        .chart-container {{
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 12px;
        }}
        
        .chart-container img {{
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }}
        
        .stats-table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 0.9em;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }}
        
        .stats-table th {{
            background: #4facfe;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }}
        
        .stats-table td {{
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
        }}
        
        .stats-table tr:nth-child(even) {{
            background: #f8f9fa;
        }}
        
        .stats-table tr:hover {{
            background: #e3f2fd;
        }}
        
        .footer {{
            background: #2c3e50;
            color: white;
            padding: 20px 40px;
            text-align: center;
            font-size: 0.9em;
        }}
        
        @media (max-width: 768px) {{
            .metrics-grid {{
                grid-template-columns: repeat(2, 1fr);
            }}
            
            .header h1 {{
                font-size: 2em;
            }}
            
            .content {{
                padding: 20px;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Data Visualization Report</h1>
            <div class="subtitle">Comprehensive Analysis Dashboard</div>
        </div>
        
        <div class="content">
            <div class="metrics-grid">
                <div class="metric-card">
                    <span class="metric-number">{rows:,}</span>
                    <span class="metric-label">Total Records</span>
                </div>
                <div class="metric-card">
                    <span class="metric-number">{cols}</span>
                    <span class="metric-label">Total Features</span>
                </div>
                <div class="metric-card">
                    <span class="metric-number">{len(num_cols)}</span>
                    <span class="metric-label">Numeric Features</span>
                </div>
                <div class="metric-card">
                    <span class="metric-number">{missing_data.sum()}</span>
                    <span class="metric-label">Missing Values</span>
                </div>
            </div>
            
            <div class="insights-list">
                <h3>🔍 Key Insights</h3>
                <ul>
                    {''.join(f'<li>{insight}</li>' for insight in insights)}
                </ul>
            </div>
            
            <div class="section">
                <h2>📈 Data Analysis Dashboard</h2>
                <div class="chart-container">
                    <img src="data:image/png;base64,{composite_img}" alt="Data Analysis Dashboard" />
                </div>
            </div>
            
            <div class="section">
                <h2>📋 Statistical Summary</h2>
                {stats_table}
            </div>
        </div>
        
        <div class="footer">
            Generated on {datetime.now().strftime('%B %d, %Y at %I:%M %p')} | Data Visualization Report
        </div>
    </div>
</body>
</html>
"""
with open('data_visualization_report.html','w',encoding='utf-8') as f:
    f.write(html)

# Save enhanced Markdown with professional formatting
os.makedirs('assets', exist_ok=True)
with open('assets/viz.png','wb') as f:
    f.write(base64.b64decode(composite_img))

md = [
    '# 📊 Data Visualization Report',
    '',
    f'**Generated on:** {datetime.now().strftime("%B %d, %Y at %I:%M %p")}',
    '',
    '## 📈 Dataset Overview',
    '',
    '| Metric | Value |',
    '|--------|-------|',
    f'| **Total Records** | {rows:,} |',
    f'| **Total Features** | {cols} |',
    f'| **Numeric Features** | {len(num_cols)} |',
    f'| **Missing Values** | {missing_data.sum()} |',
    '',
    '## 🔍 Key Insights',
    '',
    ''.join(f'- {insight}\n' for insight in insights),
    '',
    '## 📊 Data Analysis Dashboard',
    '',
    'The comprehensive dashboard below shows:',
    '- **Distribution Analysis**: Histograms revealing data spread patterns',
    '- **Correlation Matrix**: Heatmap showing feature relationships',
    '- **Outlier Detection**: Box plots identifying anomalous values',
    '- **Relationship Analysis**: Scatter plots revealing patterns between key features',
    '',
    f'![Data Analysis Dashboard](data:image/png;base64,{composite_img})',
    '',
    '## 📋 Statistical Summary',
    '',
    f"| Statistic | {' | '.join(num_cols)} |\n" +
    f"|-----------|{'----|' * len(num_cols)}\n" +
    '\n'.join([f"| **{stat.title()}** | {' | '.join([f'{stats_summary.loc[stat, col]:.3f}' for col in num_cols])} |" 
              for stat in ['mean', 'std', 'min', 'max']]),
    '',
    '---',
    '*This report was generated using advanced data visualization techniques to provide comprehensive insights into the dataset structure and patterns.*'
]

with open('visualization_report.md','w',encoding='utf-8') as f:
    f.write('\n'.join(md))

print('✅ Generated professional data visualization report with enhanced styling and comprehensive analysis')
