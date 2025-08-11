import type { Script } from '../script-config';

export const linearRegressionScript: Script = {
	id: "linear-regression",
	title: "Linear Regression Analysis",
	description: "Generate synthetic data and perform linear regression analysis using scikit-learn with comprehensive reporting.",
	filename: "linear_regression_analysis.py",
	content: `import pandas as pd
import numpy as np
import os
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_regression

def linear_regression_analysis():
    """Perform comprehensive linear regression analysis with generated data."""
    print("Linear Regression Analysis with Scikit-Learn")
    print("=" * 60)
    
    try:
        # Generate synthetic regression dataset
        print("Generating synthetic regression dataset...")
        X, y = make_regression(
            n_samples=1000,
            n_features=5,
            n_informative=3,
            noise=10,
            bias=50,
            random_state=42
        )
        
        # Create feature names
        feature_names = [f'feature_{i+1}' for i in range(X.shape[1])]
        
        # Create DataFrame
        df = pd.DataFrame(X, columns=feature_names)
        df['target'] = y
        
        print(f"✓ Generated dataset with {len(df)} samples and {X.shape[1]} features")
        print(f"✓ Target variable range: {y.min():.2f} to {y.max():.2f}")
        
        # Save the generated dataset
        dataset_path = "/data/regression_dataset.parquet"
        df.to_parquet(dataset_path, index=False)
        print(f"✓ Dataset saved to: {dataset_path}")
        
        # Dataset overview
        print("\\nDataset Overview:")
        print("-" * 30)
        print(f"Shape: {df.shape}")
        print(f"Features: {feature_names}")
        print(f"Target statistics:")
        print(f"  Mean: {y.mean():.2f}")
        print(f"  Std: {y.std():.2f}")
        print(f"  Min: {y.min():.2f}")
        print(f"  Max: {y.max():.2f}")
        
        # Prepare data for modeling
        print("\\nPreparing data for modeling...")
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        print(f"✓ Training set: {X_train.shape[0]} samples")
        print(f"✓ Test set: {X_test.shape[0]} samples")
        
        # Feature scaling (optional but good practice)
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        # Train linear regression model
        print("\\nTraining Linear Regression model...")
        lr_model = LinearRegression()
        lr_model.fit(X_train_scaled, y_train)
        
        # Make predictions
        y_train_pred = lr_model.predict(X_train_scaled)
        y_test_pred = lr_model.predict(X_test_scaled)
        
        # Calculate metrics
        train_r2 = r2_score(y_train, y_train_pred)
        test_r2 = r2_score(y_test, y_test_pred)
        train_mse = mean_squared_error(y_train, y_train_pred)
        test_mse = mean_squared_error(y_test, y_test_pred)
        train_mae = mean_absolute_error(y_train, y_train_pred)
        test_mae = mean_absolute_error(y_test, y_test_pred)
        
        print("\\nModel Performance:")
        print("-" * 30)
        print(f"Training R²: {train_r2:.4f}")
        print(f"Test R²: {test_r2:.4f}")
        print(f"Training MSE: {train_mse:.2f}")
        print(f"Test MSE: {test_mse:.2f}")
        print(f"Training MAE: {train_mae:.2f}")
        print(f"Test MAE: {test_mae:.2f}")
        print(f"Overfitting check: {(train_r2 - test_r2):.4f} (should be small)")
        
        # Feature importance (coefficients)
        print("\\nFeature Importance (Coefficients):")
        print("-" * 40)
        coefficients = lr_model.coef_
        intercept = lr_model.intercept_
        
        print(f"Intercept: {intercept:.4f}")
        for i, (feature, coef) in enumerate(zip(feature_names, coefficients)):
            print(f"{feature}: {coef:.4f}")
        
        # Feature importance ranking
        abs_coefficients = np.abs(coefficients)
        feature_importance = list(zip(feature_names, abs_coefficients))
        feature_importance.sort(key=lambda x: x[1], reverse=True)
        
        print("\\nFeature Importance Ranking:")
        print("-" * 35)
        for i, (feature, importance) in enumerate(feature_importance):
            print(f"{i+1}. {feature}: {importance:.4f}")
        
        # Generate predictions for analysis
        print("\\nGenerating prediction analysis...")
        
        # Create predictions DataFrame
        predictions_df = pd.DataFrame({
            'actual': y_test,
            'predicted': y_test_pred,
            'residual': y_test - y_test_pred,
            'abs_residual': np.abs(y_test - y_test_pred)
        })
        
        # Add feature values for test set
        for i, feature in enumerate(feature_names):
            predictions_df[f'feature_{feature}'] = X_test_scaled[:, i]
        
        # Residual analysis
        residual_mean = predictions_df['residual'].mean()
        residual_std = predictions_df['residual'].std()
        
        print(f"Residual Analysis:")
        print(f"  Mean residual: {residual_mean:.4f} (should be close to 0)")
        print(f"  Residual std: {residual_std:.4f}")
        print(f"  Max absolute residual: {predictions_df['abs_residual'].max():.2f}")
        
        # Save predictions
        predictions_path = "/data/regression_predictions.parquet"
        predictions_df.to_parquet(predictions_path, index=False)
        print(f"✓ Predictions saved to: {predictions_path}")
        
        # Create comprehensive results report
        print("\\nGenerating comprehensive results report...")
        
        results_data = {
            'metric': [],
            'value': [],
            'description': [],
            'category': []
        }
        
        # Model performance metrics
        performance_metrics = [
            ('train_r2_score', train_r2, 'R-squared score on training data', 'performance'),
            ('test_r2_score', test_r2, 'R-squared score on test data', 'performance'),
            ('train_mse', train_mse, 'Mean squared error on training data', 'performance'),
            ('test_mse', test_mse, 'Mean squared error on test data', 'performance'),
            ('train_mae', train_mae, 'Mean absolute error on training data', 'performance'),
            ('test_mae', test_mae, 'Mean absolute error on test data', 'performance'),
            ('overfitting_score', train_r2 - test_r2, 'Training R² minus Test R² (overfitting indicator)', 'performance'),
            ('model_intercept', intercept, 'Linear regression intercept term', 'model_params')
        ]
        
        for metric, value, desc, category in performance_metrics:
            results_data['metric'].append(metric)
            results_data['value'].append(float(value))
            results_data['description'].append(desc)
            results_data['category'].append(category)
        
        # Feature coefficients
        for feature, coef in zip(feature_names, coefficients):
            results_data['metric'].append(f'coef_{feature}')
            results_data['value'].append(float(coef))
            results_data['description'].append(f'Linear regression coefficient for {feature}')
            results_data['category'].append('model_params')
        
        # Dataset statistics
        dataset_stats = [
            ('dataset_samples', len(df), 'Total number of samples in dataset', 'dataset'),
            ('dataset_features', X.shape[1], 'Number of input features', 'dataset'),
            ('train_samples', X_train.shape[0], 'Number of training samples', 'dataset'),
            ('test_samples', X_test.shape[0], 'Number of test samples', 'dataset'),
            ('target_mean', float(y.mean()), 'Mean of target variable', 'dataset'),
            ('target_std', float(y.std()), 'Standard deviation of target variable', 'dataset'),
            ('residual_mean', float(residual_mean), 'Mean of prediction residuals', 'residuals'),
            ('residual_std', float(residual_std), 'Standard deviation of prediction residuals', 'residuals')
        ]
        
        for metric, value, desc, category in dataset_stats:
            results_data['metric'].append(metric)
            results_data['value'].append(value)
            results_data['description'].append(desc)
            results_data['category'].append(category)
        
        # Create results DataFrame
        results_df = pd.DataFrame(results_data)
        
        # Save results report
        results_path = "/data/linear_regression_results.parquet"
        results_df.to_parquet(results_path, index=False)
        print(f"✓ Results report saved to: {results_path}")
        
        # Generate HTML report
        print("\\nGenerating HTML report...")
        
        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Linear Regression Analysis Report</title>
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
        }}
        h2 {{
            color: #34495e;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-top: 40px;
        }}
        .metrics-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }}
        .metric-card {{
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }}
        .metric-number {{
            font-size: 1.8em;
            font-weight: bold;
            display: block;
        }}
        .metric-label {{
            font-size: 0.9em;
            opacity: 0.9;
        }}
        .performance-table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }}
        .performance-table th {{
            background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }}
        .performance-table td {{
            padding: 12px 15px;
            border-bottom: 1px solid #f0f0f0;
        }}
        .feature-importance {{
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
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
        <h1>🤖 Linear Regression Analysis Report</h1>
        
        <h2>📊 Model Performance</h2>
        <div class="metrics-grid">
            <div class="metric-card">
                <span class="metric-number">{test_r2:.3f}</span>
                <span class="metric-label">Test R² Score</span>
            </div>
            <div class="metric-card">
                <span class="metric-number">{test_mse:.1f}</span>
                <span class="metric-label">Test MSE</span>
            </div>
            <div class="metric-card">
                <span class="metric-number">{test_mae:.1f}</span>
                <span class="metric-label">Test MAE</span>
            </div>
            <div class="metric-card">
                <span class="metric-number">{(train_r2 - test_r2):.3f}</span>
                <span class="metric-label">Overfitting Score</span>
            </div>
        </div>
        
        <h2>📈 Detailed Performance Metrics</h2>
        <table class="performance-table">
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Training</th>
                    <th>Test</th>
                    <th>Interpretation</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>R² Score</strong></td>
                    <td>{train_r2:.4f}</td>
                    <td>{test_r2:.4f}</td>
                    <td>{'Excellent' if test_r2 > 0.9 else 'Good' if test_r2 > 0.7 else 'Fair' if test_r2 > 0.5 else 'Poor'} fit</td>
                </tr>
                <tr>
                    <td><strong>MSE</strong></td>
                    <td>{train_mse:.2f}</td>
                    <td>{test_mse:.2f}</td>
                    <td>Lower is better</td>
                </tr>
                <tr>
                    <td><strong>MAE</strong></td>
                    <td>{train_mae:.2f}</td>
                    <td>{test_mae:.2f}</td>
                    <td>Average prediction error</td>
                </tr>
            </tbody>
        </table>
        
        <h2>🎯 Feature Importance</h2>
        <div class="feature-importance">
            <h3>Model Coefficients</h3>
            <p><strong>Intercept:</strong> {intercept:.4f}</p>
            <table class="performance-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Feature</th>
                        <th>Coefficient</th>
                        <th>Absolute Importance</th>
                    </tr>
                </thead>
                <tbody>"""
        
        for i, (feature, importance) in enumerate(feature_importance):
            coef_value = next(coef for f, coef in zip(feature_names, coefficients) if f == feature)
            html_content += f"""
                    <tr>
                        <td>{i+1}</td>
                        <td><strong>{feature}</strong></td>
                        <td>{coef_value:.4f}</td>
                        <td>{importance:.4f}</td>
                    </tr>"""
        
        html_content += f"""
                </tbody>
            </table>
        </div>
        
        <h2>📋 Dataset Information</h2>
        <table class="performance-table">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Total Samples</strong></td>
                    <td>{len(df):,}</td>
                    <td>Generated synthetic regression dataset</td>
                </tr>
                <tr>
                    <td><strong>Features</strong></td>
                    <td>{X.shape[1]}</td>
                    <td>Input variables for prediction</td>
                </tr>
                <tr>
                    <td><strong>Training Set</strong></td>
                    <td>{X_train.shape[0]:,} ({X_train.shape[0]/len(df)*100:.0f}%)</td>
                    <td>Data used for model training</td>
                </tr>
                <tr>
                    <td><strong>Test Set</strong></td>
                    <td>{X_test.shape[0]:,} ({X_test.shape[0]/len(df)*100:.0f}%)</td>
                    <td>Data used for model evaluation</td>
                </tr>
                <tr>
                    <td><strong>Target Range</strong></td>
                    <td>{y.min():.1f} to {y.max():.1f}</td>
                    <td>Range of values to predict</td>
                </tr>
            </tbody>
        </table>
        
        <h2>🔍 Model Diagnostics</h2>
        <div class="feature-importance">
            <h3>Residual Analysis</h3>
            <p><strong>Mean Residual:</strong> {residual_mean:.6f} (should be close to 0)</p>
            <p><strong>Residual Standard Deviation:</strong> {residual_std:.4f}</p>
            <p><strong>Max Absolute Error:</strong> {predictions_df['abs_residual'].max():.2f}</p>
            
            <h3>Model Quality Assessment</h3>
            <ul>
                <li><strong>Goodness of Fit:</strong> {'Excellent' if test_r2 > 0.9 else 'Good' if test_r2 > 0.7 else 'Fair' if test_r2 > 0.5 else 'Needs Improvement'} (R² = {test_r2:.3f})</li>
                <li><strong>Overfitting:</strong> {'Low' if abs(train_r2 - test_r2) < 0.05 else 'Moderate' if abs(train_r2 - test_r2) < 0.1 else 'High'} (difference = {abs(train_r2 - test_r2):.3f})</li>
                <li><strong>Residuals:</strong> {'Well-centered' if abs(residual_mean) < 0.1 else 'May have bias'}</li>
            </ul>
        </div>
        
        <div class="footer">
            <p>Linear Regression Analysis completed on {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            <p>Generated using scikit-learn with synthetic regression data</p>
        </div>
    </div>
</body>
</html>"""
        
        # Save HTML report
        html_path = "/data/linear_regression_report.html"
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"✓ HTML report saved to: {html_path}")
        
        # Final summary
        print("\\n" + "=" * 60)
        print("LINEAR REGRESSION ANALYSIS SUMMARY")
        print("=" * 60)
        print(f"✓ Dataset: {len(df):,} samples, {X.shape[1]} features")
        print(f"✓ Model Performance: R² = {test_r2:.3f}, MSE = {test_mse:.1f}")
        print(f"✓ Most important feature: {feature_importance[0][0]}")
        print(f"✓ Generated 3 output files:")
        print(f"  - Dataset: {dataset_path}")
        print(f"  - Predictions: {predictions_path}")
        print(f"  - Results: {results_path}")
        print(f"  - HTML Report: {html_path}")
        
        return {
            'r2_score': test_r2,
            'mse': test_mse,
            'mae': test_mae,
            'overfitting_score': train_r2 - test_r2,
            'most_important_feature': feature_importance[0][0],
            'dataset_size': len(df),
            'files_generated': 4
        }
        
    except Exception as e:
        import traceback
        print(f"Error in linear regression analysis: {str(e)}")
        print("\\nFull traceback:")
        print(traceback.format_exc())
        return None

# Execute the linear regression analysis
print("Starting Linear Regression Analysis with Scikit-Learn...")
result = linear_regression_analysis()

if result:
    print("\\n🎉 Linear regression analysis completed successfully!")
    print(f"✓ Model R² Score: {result['r2_score']:.3f}")
    print(f"✓ Generated {result['files_generated']} output files")
else:
    print("\\n❌ Linear regression analysis failed. Check error messages above.")`,
	category: "machine_learning"
};