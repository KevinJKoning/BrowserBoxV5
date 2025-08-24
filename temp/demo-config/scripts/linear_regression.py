import pandas as pd, numpy as np, os, io, base64, matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error

fn = 'demo_numeric.parquet'
if not os.path.exists(fn):
    print('Missing data:', fn)
    raise SystemExit(0)

df = pd.read_parquet(fn)
X = df[['x1','x2','x3']].values
y = df['y'].values
model = LinearRegression().fit(X,y)
pred = model.predict(X)
R2 = r2_score(y,pred)
MAE = mean_absolute_error(y,pred)
RMSE = np.sqrt(mean_squared_error(y,pred))

# Scatter y vs pred
import io
buf = io.BytesIO()
plt.figure(figsize=(6,5))
plt.scatter(y, pred, alpha=0.5, edgecolor='k')
plt.xlabel('Actual y'); plt.ylabel('Predicted y'); plt.title('Linear Regression Fit')
plt.plot([y.min(), y.max()],[y.min(), y.max()],'r--')
plt.tight_layout()
plt.savefig(buf, format='png', dpi=120)
plt.close()
buf.seek(0)
img_b64 = base64.b64encode(buf.read()).decode('ascii')

# HTML report
html = f"""
<!doctype html><html><head><meta charset='utf-8'><title>Linear Regression Report</title></head>
<body>
<h1>Linear Regression Report</h1>
<p>R²: {R2:.4f} | MAE: {MAE:.4f} | RMSE: {RMSE:.4f}</p>
<img src="data:image/png;base64,{img_b64}" alt="reg"/>
</body></html>
"""
with open('linear_regression_report.html','w',encoding='utf-8') as f:
    f.write(html)

# Markdown report
os.makedirs('assets', exist_ok=True)
with open('assets/linreg.png','wb') as f:
    f.write(base64.b64decode(img_b64))
md = [
    '# Linear Regression Summary',
    f'* R²: {R2:.4f}',
    f'* MAE: {MAE:.4f}',
    f'* RMSE: {RMSE:.4f}',
    '',
    '## Inline image',
    f'![Reg](data:image/png;base64,{img_b64})',
    '',
    '## Relative image',
    '![Reg](assets/linreg.png)'
]
with open('linear_regression_summary.md','w',encoding='utf-8') as f:
    f.write('\n'.join(md))
print('Wrote linear_regression_report.html and linear_regression_summary.md')
