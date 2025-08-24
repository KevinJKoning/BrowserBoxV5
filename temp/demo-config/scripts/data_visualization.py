import pandas as pd, numpy as np, os, io, base64, matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

def fig_to_base64(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format='png', dpi=120, bbox_inches='tight')
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

# Histograms for first three numeric cols
fig, axes = plt.subplots(1, min(3, len(num_cols)), figsize=(12,4))
if not isinstance(axes, np.ndarray): axes = np.array([axes])
for ax, col in zip(axes, num_cols[:3]):
    ax.hist(df[col].dropna(), bins=30, color='#3498db', edgecolor='black', alpha=0.8)
    ax.set_title(col)
img_b64 = fig_to_base64(fig)

# Save HTML report
html = f"""
<!doctype html><html><head><meta charset='utf-8'>
<title>Visualization Report</title></head>
<body>
<h1>Visualization Report</h1>
<p>Rows: {rows:,} | Columns: {cols} | Numeric columns: {len(num_cols)}</p>
<img src="data:image/png;base64,{img_b64}" alt="histograms"/>
</body></html>
"""
with open('data_visualization_report.html','w',encoding='utf-8') as f:
    f.write(html)

# Save Markdown with inline and relative image
os.makedirs('assets', exist_ok=True)
with open('assets/viz.png','wb') as f:
    f.write(base64.b64decode(img_b64))
md = [
    '# Visualization Report (Markdown)',
    f'* Rows: {rows:,}',
    f'* Columns: {cols}',
    f'* Numeric columns: {len(num_cols)}',
    '',
    '## Inline image',
    f'![Hist](data:image/png;base64,{img_b64})',
    '',
    '## Relative image',
    '![Hist](assets/viz.png)'
]
with open('visualization_report.md','w',encoding='utf-8') as f:
    f.write('\n'.join(md))
print('Wrote data_visualization_report.html and visualization_report.md')
