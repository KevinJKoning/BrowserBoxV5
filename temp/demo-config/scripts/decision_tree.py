import pandas as pd, numpy as np, os, io, base64, matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
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

fn = 'demo_mixed.parquet'
if not os.path.exists(fn):
    print('Missing data:', fn)
    raise SystemExit(0)

df = pd.read_parquet(fn)

# Prepare features: one-hot encode categorical variables
X = pd.get_dummies(df[['x1','x2','cat']], drop_first=True)
y = df['label'].astype(int)
feature_names = X.columns.tolist()

# Train classifier with optimized parameters
clf = DecisionTreeClassifier(max_depth=4, min_samples_split=10, min_samples_leaf=5, random_state=42)
clf.fit(X, y)
pred = clf.predict(X)

# Calculate comprehensive metrics
accuracy = accuracy_score(y, pred)
report = classification_report(y, pred, output_dict=True)
conf_matrix = confusion_matrix(y, pred)
cv_scores = cross_val_score(clf, X, y, cv=5, scoring='accuracy')
cv_mean = cv_scores.mean()
cv_std = cv_scores.std()

# Feature importance analysis
feature_importance = clf.feature_importances_
importance_df = pd.DataFrame({
    'feature': feature_names,
    'importance': feature_importance
}).sort_values('importance', ascending=False)

# Create comprehensive visualization
fig = plt.figure(figsize=(18, 14))
fig.suptitle('Decision Tree Classification Analysis', fontsize=22, fontweight='bold', y=0.95)

# 1. Decision Tree Visualization (top left, larger)
ax1 = plt.subplot(3, 4, (1, 2))
plot_tree(clf, feature_names=feature_names, class_names=[f'Class {i}' for i in clf.classes_], 
          filled=True, rounded=True, fontsize=8, max_depth=2)  # Limit depth for readability
ax1.set_title('Decision Tree Structure', fontweight='bold', fontsize=14)

# 2. Feature Importance (top right)
ax2 = plt.subplot(3, 4, (3, 4))
colors = plt.cm.Set2(np.linspace(0, 1, len(importance_df)))
bars = ax2.barh(importance_df['feature'], importance_df['importance'], color=colors)
ax2.set_xlabel('Importance Score', fontweight='bold')
ax2.set_title('Feature Importance Ranking', fontweight='bold', fontsize=14)
ax2.grid(True, alpha=0.3)
# Add value labels
for i, bar in enumerate(bars):
    width = bar.get_width()
    ax2.text(width + 0.001, bar.get_y() + bar.get_height()/2, 
             f'{width:.3f}', ha='left', va='center', fontweight='bold')

# 3. Confusion Matrix (middle left)
ax3 = plt.subplot(3, 4, 5)
im = ax3.imshow(conf_matrix, cmap='Blues', aspect='auto')
ax3.set_xticks(range(len(clf.classes_)))
ax3.set_yticks(range(len(clf.classes_)))
ax3.set_xticklabels([f'Class {i}' for i in clf.classes_])
ax3.set_yticklabels([f'Class {i}' for i in clf.classes_])
# Add values as text
for i in range(len(clf.classes_)):
    for j in range(len(clf.classes_)):
        text = ax3.text(j, i, f'{conf_matrix[i, j]}',
                       ha="center", va="center", color="white" if conf_matrix[i, j] > conf_matrix.max()/2 else "black", 
                       fontweight='bold')
ax3.set_xlabel('Predicted Label', fontweight='bold')
ax3.set_ylabel('True Label', fontweight='bold')
ax3.set_title('Confusion Matrix', fontweight='bold', fontsize=12)

# 4. Classification metrics bar chart (middle center)
ax4 = plt.subplot(3, 4, 6)
metrics_names = ['Precision', 'Recall', 'F1-Score']
macro_metrics = [report['macro avg'][m] for m in ['precision', 'recall', 'f1-score']]
colors_metrics = ['#FF6B6B', '#4ECDC4', '#45B7D1']
bars = ax4.bar(metrics_names, macro_metrics, color=colors_metrics, alpha=0.8, edgecolor='black')
ax4.set_ylabel('Score', fontweight='bold')
ax4.set_title('Model Performance Metrics', fontweight='bold', fontsize=12)
ax4.set_ylim(0, 1.1)
ax4.grid(True, alpha=0.3)
# Add value labels
for bar, metric in zip(bars, macro_metrics):
    height = bar.get_height()
    ax4.text(bar.get_x() + bar.get_width()/2., height + 0.01,
             f'{metric:.3f}', ha='center', va='bottom', fontweight='bold')

# 5. Cross-validation scores (middle right)
ax5 = plt.subplot(3, 4, 7)
cv_x = range(1, len(cv_scores) + 1)
ax5.bar(cv_x, cv_scores, alpha=0.7, color='gold', edgecolor='black')
ax5.axhline(cv_mean, color='red', linestyle='--', alpha=0.8, label=f'Mean: {cv_mean:.3f}')
ax5.set_xlabel('CV Fold', fontweight='bold')
ax5.set_ylabel('Accuracy Score', fontweight='bold')
ax5.set_title('Cross-Validation Results', fontweight='bold', fontsize=12)
ax5.legend()
ax5.grid(True, alpha=0.3)

# 6. Class distribution (middle far right)
ax6 = plt.subplot(3, 4, 8)
class_counts = np.bincount(y)
ax6.pie(class_counts, labels=[f'Class {i}' for i in range(len(class_counts))], 
        autopct='%1.1f%%', colors=colors_metrics[:len(class_counts)])
ax6.set_title('Class Distribution', fontweight='bold', fontsize=12)

# 7-9. Feature distributions by class (bottom row)
numeric_features = ['x1', 'x2']
for i, feature in enumerate(numeric_features):
    ax = plt.subplot(3, 4, 9 + i)
    for class_label in clf.classes_:
        subset = df[df['label'] == class_label]
        ax.hist(subset[feature], alpha=0.6, label=f'Class {class_label}', bins=20)
    ax.set_xlabel(f'{feature.upper()}', fontweight='bold')
    ax.set_ylabel('Frequency', fontweight='bold')
    ax.set_title(f'{feature.upper()} Distribution by Class', fontweight='bold', fontsize=11)
    ax.legend()
    ax.grid(True)

# 10. Tree depth analysis (bottom right)
ax10 = plt.subplot(3, 4, 11)
depths = range(1, 8)
depth_scores = []
for depth in depths:
    temp_clf = DecisionTreeClassifier(max_depth=depth, random_state=42)
    scores = cross_val_score(temp_clf, X, y, cv=3, scoring='accuracy')
    depth_scores.append(scores.mean())

ax10.plot(depths, depth_scores, marker='o', linewidth=2, markersize=8, color='purple')
ax10.axvline(4, color='red', linestyle='--', alpha=0.7, label='Current Depth')
ax10.set_xlabel('Tree Depth', fontweight='bold')
ax10.set_ylabel('CV Accuracy', fontweight='bold')
ax10.set_title('Optimal Depth Analysis', fontweight='bold', fontsize=11)
ax10.legend()
ax10.grid(True, alpha=0.3)

plt.tight_layout()
plt.subplots_adjust(top=0.91)
composite_img = fig_to_base64(fig)

# Generate insights
insights = []
best_feature = importance_df.iloc[0]['feature']
best_importance = importance_df.iloc[0]['importance']
insights.append(f"Most important feature: {best_feature.upper()} (importance: {best_importance:.3f})")

if accuracy > 0.9:
    insights.append(f"Excellent classification accuracy: {accuracy:.3f}")
elif accuracy > 0.8:
    insights.append(f"Good classification accuracy: {accuracy:.3f}")
else:
    insights.append(f"Moderate classification accuracy: {accuracy:.3f}")

if cv_std < 0.05:
    insights.append(f"Stable cross-validation performance (σ = {cv_std:.3f})")
else:
    insights.append(f"Variable cross-validation performance (σ = {cv_std:.3f})")

tree_depth = clf.get_depth()
insights.append(f"Tree achieved depth of {tree_depth} levels for optimal complexity")

# Create detailed classification report table
report_data = []
for class_label in [str(c) for c in clf.classes_] + ['macro avg', 'weighted avg']:
    if class_label in report:
        row_data = report[class_label]
        report_data.append({
            'Class': f'Class {class_label}' if class_label.isdigit() else class_label.title(),
            'Precision': f"{row_data['precision']:.3f}",
            'Recall': f"{row_data['recall']:.3f}",
            'F1-Score': f"{row_data['f1-score']:.3f}",
            'Support': f"{row_data.get('support', 'N/A')}"
        })

report_df = pd.DataFrame(report_data)
report_table = report_df.to_html(classes='report-table', escape=False, index=False)

# Feature importance table
importance_table = importance_df.to_html(classes='importance-table', escape=False, index=False)

# Professional HTML report with enhanced styling
html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Decision Tree Classification Report</title>
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
            background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
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
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }}
        
        .metric-card {{
            background: #f8f9fa;
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            border-left: 4px solid #2ecc71;
            transition: transform 0.2s ease;
        }}
        
        .metric-card:hover {{
            transform: translateY(-2px);
        }}
        
        .metric-number {{
            font-size: 2.5em;
            font-weight: bold;
            color: #2ecc71;
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
            border-bottom: 3px solid #2ecc71;
            padding-bottom: 10px;
        }}
        
        .insights-list {{
            background: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 30px;
        }}
        
        .insights-list h3 {{
            color: #2ecc71;
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
            content: "🌳";
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
        
        .report-table, .importance-table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 0.9em;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }}
        
        .report-table th, .importance-table th {{
            background: #2ecc71;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }}
        
        .report-table td, .importance-table td {{
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
        }}
        
        .report-table tr:nth-child(even), .importance-table tr:nth-child(even) {{
            background: #f8f9fa;
        }}
        
        .report-table tr:hover, .importance-table tr:hover {{
            background: #e8f5e8;
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
            <h1>🌳 Decision Tree Classification</h1>
            <div class="subtitle">Machine Learning Model Analysis & Performance</div>
        </div>
        
        <div class="content">
            <div class="metrics-grid">
                <div class="metric-card">
                    <span class="metric-number">{accuracy:.3f}</span>
                    <span class="metric-label">Accuracy</span>
                </div>
                <div class="metric-card">
                    <span class="metric-number">{report['macro avg']['precision']:.3f}</span>
                    <span class="metric-label">Precision</span>
                </div>
                <div class="metric-card">
                    <span class="metric-number">{report['macro avg']['recall']:.3f}</span>
                    <span class="metric-label">Recall</span>
                </div>
                <div class="metric-card">
                    <span class="metric-number">{report['macro avg']['f1-score']:.3f}</span>
                    <span class="metric-label">F1-Score</span>
                </div>
                <div class="metric-card">
                    <span class="metric-number">{cv_mean:.3f}</span>
                    <span class="metric-label">CV Score</span>
                </div>
            </div>
            
            <div class="insights-list">
                <h3>🔍 Key Insights</h3>
                <ul>
                    {''.join(f'<li>{insight}</li>' for insight in insights)}
                </ul>
            </div>
            
            <div class="section">
                <h2>📈 Comprehensive Classification Dashboard</h2>
                <div class="chart-container">
                    <img src="data:image/png;base64,{composite_img}" alt="Decision Tree Classification Dashboard" />
                </div>
            </div>
            
            <div class="section">
                <h2>📊 Classification Report</h2>
                {report_table}
            </div>
            
            <div class="section">
                <h2>🎯 Feature Importance</h2>
                {importance_table}
            </div>
        </div>
        
        <div class="footer">
            Generated on {datetime.now().strftime('%B %d, %Y at %I:%M %p')} | Decision Tree Classification Report
        </div>
    </div>
</body>
</html>
"""

with open('decision_tree_report.html','w',encoding='utf-8') as f:
    f.write(html)

# Enhanced Markdown report
os.makedirs('assets', exist_ok=True)
with open('assets/tree_importances.png','wb') as f:
    f.write(base64.b64decode(composite_img))

md = [
    '# 🌳 Decision Tree Classification Report',
    '',
    f'**Generated on:** {datetime.now().strftime("%B %d, %Y at %I:%M %p")}',
    '',
    '## 🎯 Model Performance',
    '',
    '| Metric | Score | Interpretation |',
    '|--------|-------|----------------|',
    f'| **Accuracy** | {accuracy:.3f} | {"Excellent" if accuracy > 0.9 else "Good" if accuracy > 0.8 else "Moderate"} |',
    f'| **Precision (Macro)** | {report["macro avg"]["precision"]:.3f} | Average precision across classes |',
    f'| **Recall (Macro)** | {report["macro avg"]["recall"]:.3f} | Average recall across classes |',
    f'| **F1-Score (Macro)** | {report["macro avg"]["f1-score"]:.3f} | Balanced precision-recall metric |',
    f'| **Cross-Validation** | {cv_mean:.3f} ± {cv_std:.3f} | Model stability assessment |',
    '',
    '## 🔍 Key Insights',
    '',
    ''.join(f'- {insight}\n' for insight in insights),
    '',
    '## 🎯 Feature Importance Ranking',
    '',
    '| Rank | Feature | Importance Score | Impact |',
    '|------|---------|------------------|--------|',
]

for i, (_, row) in enumerate(importance_df.iterrows()):
    impact = 'High' if row['importance'] > 0.1 else 'Medium' if row['importance'] > 0.05 else 'Low'
    md.append(f'| {i+1} | **{row["feature"].upper()}** | {row["importance"]:.4f} | {impact} |')

md.extend([
    '',
    '## 📈 Comprehensive Classification Dashboard',
    '',
    'The analysis dashboard includes:',
    '- **Decision Tree Structure**: Visual representation of the learning rules',
    '- **Feature Importance**: Ranking of variables by predictive power',
    '- **Confusion Matrix**: Classification accuracy breakdown by class',
    '- **Performance Metrics**: Precision, recall, and F1-score visualization',
    '- **Cross-Validation**: Model stability across different data splits',
    '- **Class Distribution**: Balance analysis of target classes',
    '- **Feature Distributions**: How features vary across different classes',
    '- **Optimal Depth**: Analysis of tree complexity vs performance',
    '',
    f'![Decision Tree Classification Dashboard](data:image/png;base64,{composite_img})',
    '',
    '---',
    '*This report provides comprehensive decision tree analysis including model interpretability, performance metrics, and feature importance assessment.*'
])

with open('decision_tree_summary.md','w',encoding='utf-8') as f:
    f.write('\n'.join(md))

print('✅ Generated professional decision tree classification report with comprehensive analysis and visualizations')