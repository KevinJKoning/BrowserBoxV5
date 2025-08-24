import pandas as pd, numpy as np, os
fn = 'demo_numeric.parquet'
if not os.path.exists(fn):
    print('Missing', fn)
    raise SystemExit(0)

df = pd.read_parquet(fn)
rows, cols = df.shape
num_cols = df.select_dtypes(include=[np.number]).columns.tolist()
missing = int(df.isnull().sum().sum())
html = f"""
<!doctype html><html><head><meta charset='utf-8'><title>Numeric Summary</title></head>
<body>
<h1>Numeric Data Summary</h1>
<ul>
  <li>Rows: {rows:,}</li>
  <li>Columns: {cols}</li>
  <li>Numeric columns: {len(num_cols)}</li>
  <li>Total missing: {missing}</li>
</ul>
</body></html>
"""
with open('numeric_schema_report.html','w',encoding='utf-8') as f:
    f.write(html)
print('Wrote numeric_schema_report.html')
