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

# Create separate professional visualizations with better organization

# Figure 1: Distribution Analysis (2 plots side-by-side)
fig1 = plt.figure(figsize=(12, 5))
fig1.suptitle('Distribution Analysis', fontsize=16, fontweight='bold', y=0.95)

ax1 = plt.subplot(1, 2, 1)
df[num_cols[0]].hist(bins=30, alpha=0.7, color='steelblue', edgecolor='black', linewidth=0.5)
ax1.set_title(f'{num_cols[0].upper()} Distribution', fontweight='bold')
ax1.set_xlabel(num_cols[0].upper())
ax1.set_ylabel('Frequency')
ax1.grid(True)

ax2 = plt.subplot(1, 2, 2)
df[num_cols[1]].hist(bins=30, alpha=0.7, color='darkseagreen', edgecolor='black', linewidth=0.5)
ax2.set_title(f'{num_cols[1].upper()} Distribution', fontweight='bold')
ax2.set_xlabel(num_cols[1].upper())
ax2.set_ylabel('Frequency')
ax2.grid(True)

plt.tight_layout()
plt.subplots_adjust(top=0.85)
distribution_img = fig_to_base64(fig1)

# Figure 2: Correlation Analysis
fig2 = plt.figure(figsize=(8, 6))
ax = fig2.add_subplot(111)
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
plt.colorbar(im, ax=ax, shrink=0.8, label='Correlation Coefficient')
ax.set_title('Feature Correlation Matrix', fontweight='bold', fontsize=14)
plt.tight_layout()
correlation_img = fig_to_base64(fig2)

# Figure 3: Statistical Summary (Box plots and scatter)
fig3 = plt.figure(figsize=(12, 5))
fig3.suptitle('Statistical Summary', fontsize=16, fontweight='bold', y=0.95)

ax1 = plt.subplot(1, 2, 1)
bp = ax1.boxplot([df[col].dropna() for col in num_cols[:3]], 
                labels=[col.upper() for col in num_cols[:3]], patch_artist=True)
colors = ['lightcoral', 'lightblue', 'lightgreen']
for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)
    patch.set_alpha(0.7)
ax1.set_title('Distribution Summary (Box Plots)', fontweight='bold')
ax1.set_ylabel('Values')
ax1.grid(True)

if len(num_cols) >= 2:
    ax2 = plt.subplot(1, 2, 2)
    ax2.scatter(df[num_cols[0]], df[num_cols[1]], alpha=0.6, s=40, color='navy')
    ax2.set_xlabel(f'{num_cols[0].upper()}')
    ax2.set_ylabel(f'{num_cols[1].upper()}')
    ax2.set_title(f'Feature Relationship: {num_cols[0].upper()} vs {num_cols[1].upper()}', fontweight='bold')
    ax2.grid(True)

plt.tight_layout()
plt.subplots_adjust(top=0.85)
summary_img = fig_to_base64(fig3)

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

# Create summary statistics table
stats_table = stats_summary.to_html(classes='stats-table', table_id='summary-stats', escape=False)

# Professional HTML report
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
        
        .intro {{
            background: #f8f9fa;
            border-left: 4px solid #4facfe;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 5px;
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
            <h1>Data Visualization Report</h1>
            <div class="subtitle">Comprehensive Analysis Dashboard</div>
        </div>
        
        <div class="content">
            <div class="intro">
                <h3>Introduction</h3>
                <p>This report presents a comprehensive exploratory data analysis of the numerical dataset, focusing on understanding the underlying structure, relationships, and statistical properties of the data. The analysis employs standard descriptive statistics, correlation analysis, and visualization techniques to provide insights into data quality and feature relationships that inform subsequent modeling decisions.</p>
            </div>
            
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
                <h3>Key Insights</h3>
                <ul>
                    {''.join(f'<li>{insight}</li>' for insight in insights)}
                </ul>
            </div>
            
            <div class="section">
                <h2>Distribution Analysis</h2>
                <p>The distribution plots reveal the underlying probability distributions of key numerical features, highlighting potential skewness, modality, and outliers that may impact modeling approaches.</p>
                <div class="chart-container">
                    <img src="data:image/png;base64,{distribution_img}" alt="Distribution Analysis" />
                </div>
            </div>
            
            <div class="section">
                <h2>Correlation Analysis</h2>
                <p>The correlation matrix quantifies linear relationships between features using Pearson correlation coefficients, ranging from -1 (perfect negative correlation) to +1 (perfect positive correlation). Strong correlations may indicate multicollinearity concerns for predictive modeling.</p>
                <div class="chart-container">
                    <img src="data:image/png;base64,{correlation_img}" alt="Correlation Analysis" />
                </div>
            </div>
            
            <div class="section">
                <h2>Statistical Summary</h2>
                <p>The statistical summary provides quartile-based distribution analysis through box plots and examines bivariate relationships to identify potential patterns or anomalies in the data structure.</p>
                <div class="chart-container">
                    <img src="data:image/png;base64,{summary_img}" alt="Statistical Summary" />
                </div>
            </div>
            
            <div class="section">
                <h2>Descriptive Statistics</h2>
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

# Enhanced Markdown report
os.makedirs('assets', exist_ok=True)
with open('assets/viz.png','wb') as f:
    f.write(base64.b64decode(distribution_img))

with open('assets/correlation.png','wb') as f:
    f.write(base64.b64decode(correlation_img))

with open('assets/summary.png','wb') as f:
    f.write(base64.b64decode(summary_img))

md = [
    '# Data Visualization Report',
    '',
    f'**Generated on:** {datetime.now().strftime("%B %d, %Y at %I:%M %p")}',
    '',
    '## Introduction',
    '',
    'This report presents a comprehensive exploratory data analysis of the numerical dataset, focusing on understanding the underlying structure, relationships, and statistical properties of the data. The analysis employs standard descriptive statistics, correlation analysis, and visualization techniques to provide insights into data quality and feature relationships that inform subsequent modeling decisions.',
    '',
    '## Data Analysis Workflow',
    '',
    '```mermaid',
    'flowchart TD',
    '    A[Load Dataset] --> B[Data Quality Check]',
    '    B --> C[Statistical Summary]',
    '    C --> D[Distribution Analysis]',
    '    D --> E[Correlation Analysis]',
    '    E --> F[Visualization Generation]',
    '    F --> G[Report Creation]',
    '    ',
    '    B --> H[Missing Values Check]',
    '    C --> I[Descriptive Statistics]',
    '    D --> J[Histogram Plots]',
    '    E --> K[Correlation Matrix]',
    '    F --> L[Scatter Plots]',
    '    ',
    '    style A fill:#e1f5fe',
    '    style G fill:#c8e6c9',
    '    style F fill:#fff3e0',
    '```',
    '',
    '## Dataset Overview',
    '',
    '| Metric | Value |',
    '|--------|-------|',
    f'| **Total Records** | {rows:,} |',
    f'| **Total Features** | {cols} |',
    f'| **Numeric Features** | {len(num_cols)} |',
    f'| **Missing Values** | {missing_data.sum()} |',
    '',
    '## Key Insights',
    '',
    ''.join(f'- {insight}\n' for insight in insights),
    '',
    '## Figure 1: Distribution Analysis',
    '',
    'The distribution plots reveal the underlying probability distributions of key numerical features, highlighting potential skewness, modality, and outliers that may impact modeling approaches.',
    '',
    f'![Distribution Analysis](assets/viz.png)',
    '',
    '## Figure 2: Correlation Analysis', 
    '',
    'The correlation matrix quantifies linear relationships between features using Pearson correlation coefficients, ranging from -1 (perfect negative correlation) to +1 (perfect positive correlation). Strong correlations may indicate multicollinearity concerns for predictive modeling.',
    '',
    f'![Correlation Analysis](assets/correlation.png)',
    '',
    '## Figure 3: Statistical Summary',
    '',
    'The statistical summary provides quartile-based distribution analysis through box plots and examines bivariate relationships to identify potential patterns or anomalies in the data structure.',
    '',
    f'![Statistical Summary](assets/summary.png)',
    '',
    '## Table 1: Descriptive Statistics',
    '',
    f"| Statistic | {' | '.join(num_cols)} |",
    f"|-----------|{'----|' * len(num_cols)}",
    '\n'.join([f"| **{stat.title()}** | {' | '.join([f'{stats_summary.loc[stat, col]:.3f}' for col in num_cols])} |" 
              for stat in ['mean', 'std', 'min', 'max']]),
    '',
    '---',
    '*This report provides comprehensive exploratory data analysis using standard statistical and visualization techniques to understand dataset structure and inform modeling decisions.*'
]

with open('visualization_report.md','w',encoding='utf-8') as f:
    f.write('\n'.join(md))

print('Generated professional data visualization report with enhanced styling and comprehensive analysis')