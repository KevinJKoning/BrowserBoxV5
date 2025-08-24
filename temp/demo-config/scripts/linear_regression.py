import pandas as pd, numpy as np, os, io, base64, matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from sklearn.model_selection import cross_val_score
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

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
X = df[['x1','x2','x3']].values
y = df['y'].values

# Fit model and make predictions
model = LinearRegression().fit(X, y)
pred = model.predict(X)

# Calculate comprehensive metrics
R2 = r2_score(y, pred)
MAE = mean_absolute_error(y, pred)
RMSE = np.sqrt(mean_squared_error(y, pred))
cv_scores = cross_val_score(model, X, y, cv=5, scoring='r2')
cv_mean = cv_scores.mean()
cv_std = cv_scores.std()

# Calculate residuals and additional diagnostics
residuals = y - pred
residuals_std = np.std(residuals)
leverage = np.diag(X @ np.linalg.pinv(X.T @ X) @ X.T)

# Feature importance (coefficients)
feature_names = ['x1', 'x2', 'x3']
coefficients = model.coef_
intercept = model.intercept_

# Create comprehensive visualization
fig = plt.figure(figsize=(16, 12))
fig.suptitle('Linear Regression Analysis Report', fontsize=20, fontweight='bold', y=0.96)

# 1. Actual vs Predicted scatter plot
ax1 = plt.subplot(3, 3, 1)
scatter = ax1.scatter(y, pred, alpha=0.6, c=leverage, cmap='viridis', s=40)
ax1.plot([y.min(), y.max()], [y.min(), y.max()], 'r--', lw=2, alpha=0.8)
ax1.set_xlabel('Actual Values', fontweight='bold')
ax1.set_ylabel('Predicted Values', fontweight='bold')
ax1.set_title('Actual vs Predicted', fontweight='bold', fontsize=12)
ax1.grid(True, alpha=0.3)
plt.colorbar(scatter, ax=ax1, label='Leverage')

# 2. Residuals vs Fitted
ax2 = plt.subplot(3, 3, 2)
ax2.scatter(pred, residuals, alpha=0.6, color='coral', s=40)
ax2.axhline(y=0, color='red', linestyle='--', alpha=0.8)
ax2.set_xlabel('Fitted Values', fontweight='bold')
ax2.set_ylabel('Residuals', fontweight='bold')
ax2.set_title('Residuals vs Fitted', fontweight='bold', fontsize=12)
ax2.grid(True, alpha=0.3)

# 3. Feature importance (coefficients)
ax3 = plt.subplot(3, 3, 3)
colors = ['#FF6B6B', '#4ECDC4', '#45B7D1']
bars = ax3.bar(feature_names, coefficients, color=colors, alpha=0.8, edgecolor='black')
ax3.set_ylabel('Coefficient Value', fontweight='bold')
ax3.set_title('Feature Coefficients', fontweight='bold', fontsize=12)
ax3.grid(True, alpha=0.3)
# Add value labels on bars
for bar, coef in zip(bars, coefficients):
    height = bar.get_height()
    ax3.text(bar.get_x() + bar.get_width()/2., height + (0.01 if height >= 0 else -0.05),
             f'{coef:.3f}', ha='center', va='bottom' if height >= 0 else 'top', fontweight='bold')

# 4. Residuals histogram
ax4 = plt.subplot(3, 3, 4)
ax4.hist(residuals, bins=25, alpha=0.7, color='lightblue', edgecolor='black')
ax4.axvline(residuals.mean(), color='red', linestyle='--', alpha=0.8, label=f'Mean: {residuals.mean():.3f}')
ax4.set_xlabel('Residuals', fontweight='bold')
ax4.set_ylabel('Frequency', fontweight='bold')
ax4.set_title('Residuals Distribution', fontweight='bold', fontsize=12)
ax4.legend()
ax4.grid(True, alpha=0.3)

# 5. Q-Q Plot for normality
ax5 = plt.subplot(3, 3, 5)
from scipy import stats
stats.probplot(residuals, dist="norm", plot=ax5)
ax5.set_title('Q-Q Plot (Normality Test)', fontweight='bold', fontsize=12)
ax5.grid(True, alpha=0.3)

# 6. Cross-validation scores
ax6 = plt.subplot(3, 3, 6)
cv_x = range(1, len(cv_scores) + 1)
ax6.bar(cv_x, cv_scores, alpha=0.7, color='gold', edgecolor='black')
ax6.axhline(cv_mean, color='red', linestyle='--', alpha=0.8, label=f'Mean: {cv_mean:.3f}')
ax6.set_xlabel('CV Fold', fontweight='bold')
ax6.set_ylabel('R² Score', fontweight='bold')
ax6.set_title('Cross-Validation Results', fontweight='bold', fontsize=12)
ax6.legend()
ax6.grid(True, alpha=0.3)

# 7. Feature vs Target relationships (bottom row)
for i, feature in enumerate(['x1', 'x2', 'x3']):
    ax = plt.subplot(3, 3, 7 + i)
    ax.scatter(df[feature], y, alpha=0.6, s=30, color=colors[i])
    
    # Add trend line
    z = np.polyfit(df[feature], y, 1)
    p = np.poly1d(z)
    ax.plot(df[feature].sort_values(), p(df[feature].sort_values()), 
            color='red', linestyle='--', alpha=0.8, linewidth=2)
    
    ax.set_xlabel(f'{feature.upper()}', fontweight='bold')
    ax.set_ylabel('Target (y)', fontweight='bold')
    ax.set_title(f'{feature.upper()} vs Target', fontweight='bold', fontsize=11)
    ax.grid(True)

plt.tight_layout()
plt.subplots_adjust(top=0.92)
composite_img = fig_to_base64(fig)

# Generate model equation for display
equation_parts = []
for i, (feat, coef) in enumerate(zip(feature_names, coefficients)):
    sign = '+' if coef >= 0 and i > 0 else ''
    equation_parts.append(f"{sign}{coef:.3f}·{feat}")
model_equation = f"ŷ = {intercept:.3f} + " + " ".join(equation_parts)

# Generate insights
insights = []
best_feature = feature_names[np.argmax(np.abs(coefficients))]
insights.append(f"Most influential feature: {best_feature.upper()} (coefficient: {coefficients[np.argmax(np.abs(coefficients))]:.3f})")

if R2 > 0.8:
    insights.append(f"Excellent model fit with R² = {R2:.3f}")
elif R2 > 0.6:
    insights.append(f"Good model fit with R² = {R2:.3f}")
else:
    insights.append(f"Moderate model fit with R² = {R2:.3f} - consider feature engineering")

if cv_std < 0.1:
    insights.append(f"Stable cross-validation performance (σ = {cv_std:.3f})")
else:
    insights.append(f"Variable cross-validation performance (σ = {cv_std:.3f}) - model may be sensitive to data splits")

if abs(residuals.mean()) < 0.01:
    insights.append("Residuals are well-centered around zero")
else:
    insights.append(f"Residuals show slight bias (mean = {residuals.mean():.3f})")

# Create metrics table
metrics_data = {
    'Metric': ['R-squared (R²)', 'Mean Absolute Error', 'Root Mean Square Error', 
               'Cross-Validation R²', 'CV Standard Deviation', 'Residuals Std Dev'],
    'Value': [f'{R2:.4f}', f'{MAE:.4f}', f'{RMSE:.4f}', 
              f'{cv_mean:.4f}', f'{cv_std:.4f}', f'{residuals_std:.4f}'],
    'Interpretation': [
        'Excellent' if R2 > 0.8 else 'Good' if R2 > 0.6 else 'Moderate',
        'Low error' if MAE < np.std(y) * 0.5 else 'Moderate error',
        'Low error' if RMSE < np.std(y) * 0.7 else 'Moderate error',
        'Stable' if cv_mean > 0.7 else 'Variable',
        'Stable' if cv_std < 0.1 else 'Variable',
        'Well-fitted' if residuals_std < np.std(y) * 0.8 else 'Some variance unexplained'
    ]
}
metrics_df = pd.DataFrame(metrics_data)
metrics_table = metrics_df.to_html(classes='metrics-table', escape=False, index=False)

# Create coefficients table
coef_data = {
    'Feature': ['Intercept'] + feature_names,
    'Coefficient': [f'{intercept:.4f}'] + [f'{c:.4f}' for c in coefficients],
    'Impact': ['Base value'] + ['High' if abs(c) > np.mean(np.abs(coefficients)) else 'Low' for c in coefficients]
}
coef_df = pd.DataFrame(coef_data)
coef_table = coef_df.to_html(classes='coefficients-table', escape=False, index=False)

# Professional HTML report
html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Linear Regression Analysis Report</title>
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
            background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
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
            border-left: 4px solid #ff6b6b;
            transition: transform 0.2s ease;
        }}
        
        .metric-card:hover {{
            transform: translateY(-2px);
        }}
        
        .metric-number {{
            font-size: 2.5em;
            font-weight: bold;
            color: #ff6b6b;
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
            border-bottom: 3px solid #ff6b6b;
            padding-bottom: 10px;
        }}
        
        .equation-box {{
            background: #f8f9fa;
            border: 2px solid #ff6b6b;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
            font-size: 1.2em;
            font-weight: bold;
            color: #2c3e50;
        }}
        
        .insights-list {{
            background: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 30px;
        }}
        
        .insights-list h3 {{
            color: #ff6b6b;
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
            content: "📈";
            position: absolute;
            left: 0;
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
        
        .metrics-table, .coefficients-table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 0.9em;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }}
        
        .metrics-table th, .coefficients-table th {{
            background: #ff6b6b;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }}
        
        .metrics-table td, .coefficients-table td {{
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
        }}
        
        .metrics-table tr:nth-child(even), .coefficients-table tr:nth-child(even) {{
            background: #f8f9fa;
        }}
        
        .metrics-table tr:hover, .coefficients-table tr:hover {{
            background: #ffe0e0;
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
            <h1>📊 Linear Regression Analysis</h1>
            <div class="subtitle">Predictive Modeling & Performance Assessment</div>
        </div>
        
        <div class="content">
            <div class="metrics-grid">
                <div class="metric-card">
                    <span class="metric-number">{R2:.3f}</span>
                    <span class="metric-label">R-squared</span>
                </div>
                <div class="metric-card">
                    <span class="metric-number">{MAE:.3f}</span>
                    <span class="metric-label">Mean Abs Error</span>
                </div>
                <div class="metric-card">
                    <span class="metric-number">{RMSE:.3f}</span>
                    <span class="metric-label">Root MSE</span>
                </div>
                <div class="metric-card">
                    <span class="metric-number">{cv_mean:.3f}</span>
                    <span class="metric-label">CV R-squared</span>
                </div>
            </div>
            
            <div class="section">
                <h2>📐 Model Equation</h2>
                <div class="equation-box">
                    {model_equation}
                </div>
            </div>
            
            <div class="insights-list">
                <h3>🔍 Key Insights</h3>
                <ul>
                    {''.join(f'<li>{insight}</li>' for insight in insights)}
                </ul>
            </div>
            
            <div class="section">
                <h2>📈 Comprehensive Analysis Dashboard</h2>
                <div class="chart-container">
                    <img src="data:image/png;base64,{composite_img}" alt="Linear Regression Analysis Dashboard" />
                </div>
            </div>
            
            <div class="section">
                <h2>📋 Performance Metrics</h2>
                {metrics_table}
            </div>
            
            <div class="section">
                <h2>🎯 Model Coefficients</h2>
                {coef_table}
            </div>
        </div>
        
        <div class="footer">
            Generated on {datetime.now().strftime('%B %d, %Y at %I:%M %p')} | Linear Regression Analysis Report
        </div>
    </div>
</body>
</html>
"""

with open('linear_regression_report.html','w',encoding='utf-8') as f:
    f.write(html)

# Enhanced Markdown report
os.makedirs('assets', exist_ok=True)
with open('assets/linreg.png','wb') as f:
    f.write(base64.b64decode(composite_img))

md = [
    '# 📊 Linear Regression Analysis Report',
    '',
    f'**Generated on:** {datetime.now().strftime("%B %d, %Y at %I:%M %p")}',
    '',
    '## 📐 Model Equation',
    '',
    f'```',
    f'{model_equation}',
    f'```',
    '',
    '## 🎯 Performance Metrics',
    '',
    '| Metric | Value | Interpretation |',
    '|--------|-------|----------------|',
    f'| **R-squared (R²)** | {R2:.4f} | {"Excellent" if R2 > 0.8 else "Good" if R2 > 0.6 else "Moderate"} model fit |',
    f'| **Mean Absolute Error** | {MAE:.4f} | Average prediction error |',
    f'| **Root Mean Square Error** | {RMSE:.4f} | Penalized prediction error |',
    f'| **Cross-Validation R²** | {cv_mean:.4f} ± {cv_std:.4f} | Model stability |',
    '',
    '## 🔍 Key Insights',
    '',
    ''.join(f'- {insight}\n' for insight in insights),
    '',
    '## 🎯 Feature Coefficients',
    '',
    '| Feature | Coefficient | Impact |',
    '|---------|-------------|--------|',
    f'| **Intercept** | {intercept:.4f} | Base prediction value |',
]

for feat, coef in zip(feature_names, coefficients):
    impact = 'High' if abs(coef) > np.mean(np.abs(coefficients)) else 'Low'
    md.append(f'| **{feat.upper()}** | {coef:.4f} | {impact} impact |')

md.extend([
    '',
    '## 📈 Comprehensive Analysis Dashboard',
    '',
    'The analysis dashboard includes:',
    '- **Actual vs Predicted**: Scatter plot showing model accuracy with leverage coloring',
    '- **Residuals Analysis**: Distribution and patterns in prediction errors',
    '- **Feature Importance**: Coefficient magnitudes and directions',
    '- **Model Diagnostics**: Q-Q plots and cross-validation results',
    '- **Feature Relationships**: Individual feature correlations with target',
    '',
    f'![Linear Regression Analysis Dashboard](data:image/png;base64,{composite_img})',
    '',
    '---',
    '*This report provides comprehensive linear regression analysis including model performance, diagnostic plots, and feature importance assessment.*'
])

with open('linear_regression_summary.md','w',encoding='utf-8') as f:
    f.write('\n'.join(md))

print('✅ Generated professional linear regression analysis report with comprehensive diagnostics and visualizations')