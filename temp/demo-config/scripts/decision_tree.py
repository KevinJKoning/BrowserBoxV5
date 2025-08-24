import pandas as pd, numpy as np, os, io, base64, matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import classification_report

fn = 'demo_mixed.parquet'
if not os.path.exists(fn):
    print('Missing data:', fn)
    raise SystemExit(0)

df = pd.read_parquet(fn)
# Prepare features: one-hot encode 'cat'
X = pd.get_dummies(df[['x1','x2','cat']], drop_first=True)
y = df['label'].astype(int)
clf = DecisionTreeClassifier(max_depth=4, random_state=42)
clf.fit(X,y)
pred = clf.predict(X)
report = classification_report(y, pred)

# Feature importances
imp = pd.Series(clf.feature_importances_, index=X.columns).sort_values(ascending=False)[:10]
plt.figure(figsize=(7,4))
imp.plot(kind='bar', color='#2ecc71', edgecolor='k')
plt.title('Top Feature Importances')
plt.tight_layout()
buf = io.BytesIO(); plt.savefig(buf, format='png', dpi=120); plt.close(); buf.seek(0)
img_b64 = base64.b64encode(buf.read()).decode('ascii')

# HTML report
html = f"""
<!doctype html><html><head><meta charset='utf-8'><title>Decision Tree Report</title></head>
<body>
<h1>Decision Tree Classification Report</h1>
<pre>{report}</pre>
<img src="data:image/png;base64,{img_b64}" alt="importances"/>
</body></html>
"""
with open('decision_tree_report.html','w',encoding='utf-8') as f:
    f.write(html)

# Markdown report
os.makedirs('assets', exist_ok=True)
with open('assets/tree_importances.png','wb') as f:
    f.write(base64.b64decode(img_b64))
md = [
    '# Decision Tree Summary',
    '```',
    report,
    '```',
    '',
    '## Inline image',
    f'![Tree](data:image/png;base64,{img_b64})',
    '',
    '## Relative image',
    '![Tree](assets/tree_importances.png)'
]
with open('decision_tree_summary.md','w',encoding='utf-8') as f:
    f.write('\n'.join(md))
print('Wrote decision_tree_report.html and decision_tree_summary.md')
