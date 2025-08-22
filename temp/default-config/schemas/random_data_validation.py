import pandas as pd
import numpy as np
import json
import os
from datetime import datetime

def validate_random_data_schema():
    """Validate random_data.parquet against expected schema."""
    file_path = "/data/random_data.parquet"
    
    # Schema expectations (matching TypeScript interface)
    expected_schema = {
        "id": {"type": "int64", "required": True, "min_value": 1, "null_allowed": False},
        "age": {"type": "int64", "required": True, "min_value": 0, "max_value": 150, "null_allowed": False},
        "income": {"type": "float64", "required": True, "min_value": 0, "max_value": 1000000, "null_allowed": True},
        "category": {"type": "string", "required": True, "allowed_values": ["A", "B", "C", "D"], "max_categories": 4, "null_allowed": False},
        "score": {"type": "float64", "required": False, "min_value": 0.0, "max_value": 100.0, "null_allowed": True}
    }
    
    expected_row_count = {"min": 100, "max": 100000}
    
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            return {
                "overall_status": "fail",
                "column_validations": [],
                "summary": {"total_checks": 1, "passed": 0, "failed": 1, "warnings": 0},
                "validation_timestamp": datetime.now().isoformat(),
                "metadata": {"error": f"File not found: {file_path}"}
            }
        
        # Read the parquet file
        print(f"Loading and validating: {file_path}")
        df = pd.read_parquet(file_path)
        
        validation_result = {
            "overall_status": "pass",
            "column_validations": [],
            "summary": {"total_checks": 0, "passed": 0, "failed": 0, "warnings": 0},
            "validation_timestamp": datetime.now().isoformat(),
            "metadata": {
                "total_rows": len(df),
                "total_columns": len(df.columns),
                "file_size": os.path.getsize(file_path)
            }
        }
        
        # Validate row count
        row_count = len(df)
        if row_count < expected_row_count["min"] or row_count > expected_row_count["max"]:
            validation_result["overall_status"] = "fail"
        
        # Validate each expected column
        for col_name, expectations in expected_schema.items():
            col_validation = {
                "column_name": col_name,
                "expected_type": expectations["type"],
                "actual_type": None,
                "status": "pass",
                "checks": []
            }
            
            # Check if column exists
            if col_name not in df.columns:
                if expectations["required"]:
                    col_validation["status"] = "fail"
                    col_validation["checks"].append({
                        "check": "column_exists",
                        "status": "fail",
                        "message": f"Required column '{col_name}' is missing"
                    })
                    validation_result["overall_status"] = "fail"
                else:
                    col_validation["status"] = "warning"
                    col_validation["checks"].append({
                        "check": "column_exists", 
                        "status": "warning",
                        "message": f"Optional column '{col_name}' is missing"
                    })
            else:
                col_data = df[col_name]
                col_validation["actual_type"] = str(col_data.dtype)
                
                # Type validation
                expected_dtype = expectations["type"]
                actual_dtype = str(col_data.dtype)
                
                type_check = {"check": "data_type", "expected": expected_dtype, "actual": actual_dtype}
                if expected_dtype == "int64" and "int" in actual_dtype:
                    type_check["status"] = "pass"
                    type_check["message"] = "Data type matches"
                elif expected_dtype == "float64" and "float" in actual_dtype:
                    type_check["status"] = "pass" 
                    type_check["message"] = "Data type matches"
                elif expected_dtype == "string" and "object" in actual_dtype:
                    type_check["status"] = "pass"
                    type_check["message"] = "Data type matches"
                else:
                    type_check["status"] = "fail"
                    type_check["message"] = f"Expected {expected_dtype}, got {actual_dtype}"
                    col_validation["status"] = "fail"
                    validation_result["overall_status"] = "fail"
                
                col_validation["checks"].append(type_check)
                
                # Null value validation
                null_count = col_data.isnull().sum()
                null_check = {
                    "check": "null_values",
                    "actual": int(null_count),
                    "message": f"Found {null_count} null values"
                }
                
                if null_count > 0 and not expectations.get("null_allowed", True):
                    null_check["status"] = "fail"
                    null_check["message"] += " (nulls not allowed)"
                    col_validation["status"] = "fail"
                    validation_result["overall_status"] = "fail"
                else:
                    null_check["status"] = "pass"
                
                col_validation["checks"].append(null_check)
                
                # Numeric range validation
                if "min_value" in expectations and col_data.dtype in ['int64', 'float64']:
                    min_val = float(col_data.min())
                    min_check = {
                        "check": "min_value",
                        "expected": expectations["min_value"],
                        "actual": min_val
                    }
                    
                    if min_val < expectations["min_value"]:
                        min_check["status"] = "fail"
                        min_check["message"] = f"Minimum value {min_val} below expected {expectations['min_value']}"
                        col_validation["status"] = "fail"
                        validation_result["overall_status"] = "fail"
                    else:
                        min_check["status"] = "pass"
                        min_check["message"] = f"Minimum value {min_val} within range"
                    
                    col_validation["checks"].append(min_check)
                
                if "max_value" in expectations and col_data.dtype in ['int64', 'float64']:
                    max_val = float(col_data.max())
                    max_check = {
                        "check": "max_value", 
                        "expected": expectations["max_value"],
                        "actual": max_val
                    }
                    
                    if max_val > expectations["max_value"]:
                        max_check["status"] = "fail"
                        max_check["message"] = f"Maximum value {max_val} above expected {expectations['max_value']}"
                        col_validation["status"] = "fail"
                        validation_result["overall_status"] = "fail"
                    else:
                        max_check["status"] = "pass"
                        max_check["message"] = f"Maximum value {max_val} within range"
                    
                    col_validation["checks"].append(max_check)
                
                # Categorical validation
                if "allowed_values" in expectations:
                    unique_vals = col_data.dropna().unique()
                    violations = [val for val in unique_vals if val not in expectations["allowed_values"]]
                    
                    cat_check = {
                        "check": "allowed_values",
                        "expected": expectations["allowed_values"],
                        "violations": violations
                    }
                    
                    if violations:
                        cat_check["status"] = "fail"
                        cat_check["message"] = f"Found {len(violations)} invalid categorical values"
                        col_validation["status"] = "fail"
                        validation_result["overall_status"] = "fail"
                    else:
                        cat_check["status"] = "pass"
                        cat_check["message"] = "All values within allowed categories"
                    
                    col_validation["checks"].append(cat_check)
            
            validation_result["column_validations"].append(col_validation)
        
        # Calculate summary statistics
        total_checks = sum(len(col["checks"]) for col in validation_result["column_validations"])
        passed = sum(1 for col in validation_result["column_validations"] for check in col["checks"] if check["status"] == "pass")
        failed = sum(1 for col in validation_result["column_validations"] for check in col["checks"] if check["status"] == "fail")
        warnings = sum(1 for col in validation_result["column_validations"] for check in col["checks"] if check["status"] == "warning")
        
        validation_result["summary"] = {
            "total_checks": total_checks,
            "passed": passed,
            "failed": failed,
            "warnings": warnings
        }
        
        # Save validation results as JSON
        output_path = "/data/random_data_schema_validation_results.json"
        with open(output_path, 'w') as f:
            json.dump(validation_result, f, indent=2)
        
        # Generate HTML report
        generate_html_report(validation_result, df)
        
        print("\n" + "="*60)
        print("SCHEMA VALIDATION RESULTS")
        print("="*60)
        print(f"Overall Status: {validation_result['overall_status'].upper()}")
        print(f"Total Checks: {total_checks}")
        print(f"Passed: {passed}")
        print(f"Failed: {failed}")
        print(f"Warnings: {warnings}")
        print(f"\nValidation results saved to: {output_path}")
        print(f"HTML report saved to: /data/random_data_report.html")
        
        return validation_result
        
    except Exception as e:
        import traceback
        error_result = {
            "overall_status": "fail",
            "column_validations": [],
            "summary": {"total_checks": 1, "passed": 0, "failed": 1, "warnings": 0},
            "validation_timestamp": datetime.now().isoformat(),
            "metadata": {"error": str(e), "traceback": traceback.format_exc()}
        }
        
        print(f"Error during schema validation: {str(e)}")
        print("\nFull traceback:")
        print(traceback.format_exc())
        
        return error_result

def generate_html_report(validation_result, df):
    """Generate an HTML validation report."""
    status = validation_result['overall_status']
    status_color = '#28a745' if status == 'pass' else '#dc3545' if status == 'fail' else '#ffc107'
    status_icon = '✅' if status == 'pass' else '❌' if status == 'fail' else '⚠️'
    
    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Data Schema Validation Report</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }}
        .container {{ max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        .header {{ text-align: center; margin-bottom: 30px; }}
        .status-badge {{ display: inline-block; padding: 10px 20px; border-radius: 5px; color: white; font-weight: bold; background-color: {status_color}; }}
        .summary {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }}
        .summary-card {{ background: #f8f9fa; padding: 15px; border-radius: 5px; text-align: center; }}
        .summary-card h3 {{ margin: 0 0 10px 0; color: #333; }}
        .summary-card .number {{ font-size: 2em; font-weight: bold; color: #007bff; }}
        .columns-section {{ margin-top: 30px; }}
        .column-card {{ background: #f8f9fa; margin: 10px 0; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff; }}
        .column-card.fail {{ border-left-color: #dc3545; }}
        .column-card.warning {{ border-left-color: #ffc107; }}
        .checks {{ margin-top: 15px; }}
        .check {{ background: white; margin: 5px 0; padding: 10px; border-radius: 3px; border-left: 3px solid #6c757d; }}
        .check.pass {{ border-left-color: #28a745; }}
        .check.fail {{ border-left-color: #dc3545; }}
        .check.warning {{ border-left-color: #ffc107; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
        th, td {{ padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }}
        th {{ background-color: #f2f2f2; }}
        .metadata {{ background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Schema Validation Report</h1>
            <div class="status-badge">{status_icon} {status.upper()}</div>
            <p>Generated on {validation_result['validation_timestamp']}</p>
        </div>
        
        <div class="summary">
            <div class="summary-card">
                <h3>Total Checks</h3>
                <div class="number">{validation_result['summary']['total_checks']}</div>
            </div>
            <div class="summary-card">
                <h3>Passed</h3>
                <div class="number" style="color: #28a745;">{validation_result['summary']['passed']}</div>
            </div>
            <div class="summary-card">
                <h3>Failed</h3>
                <div class="number" style="color: #dc3545;">{validation_result['summary']['failed']}</div>
            </div>
            <div class="summary-card">
                <h3>Warnings</h3>
                <div class="number" style="color: #ffc107;">{validation_result['summary']['warnings']}</div>
            </div>
        </div>
        
        <div class="metadata">
            <h3>Dataset Information</h3>
            <p><strong>Rows:</strong> {validation_result['metadata']['total_rows']:,}</p>
            <p><strong>Columns:</strong> {validation_result['metadata']['total_columns']}</p>
            <p><strong>File Size:</strong> {validation_result['metadata'].get('file_size', 0):,} bytes</p>
        </div>
        
        <div class="columns-section">
            <h2>Column Validation Results</h2>
    """
    
    for col in validation_result['column_validations']:
        status_class = col['status']
        html_content += f"""
            <div class="column-card {status_class}">
                <h3>{col['column_name']}</h3>
                <p><strong>Expected Type:</strong> {col['expected_type']}</p>
                <p><strong>Actual Type:</strong> {col.get('actual_type', 'N/A')}</p>
                <p><strong>Status:</strong> {col['status'].upper()}</p>
                
                <div class="checks">
        """
        
        for check in col['checks']:
            html_content += f"""
                    <div class="check {check['status']}">
                        <strong>{check['check'].replace('_', ' ').title()}:</strong> {check['message']}
                    </div>
            """
        
        html_content += """
                </div>
            </div>
        """
    
    html_content += """
        </div>
    </div>
</body>
</html>
    """
    
    # Save HTML report
    html_path = "/data/random_data_report.html"
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

# Execute the validation
print("Random Data Schema Validation")
print("="*60)
result = validate_random_data_schema()

if result["overall_status"] == "pass":
    print("\n✅ Schema validation passed!")
elif result["overall_status"] == "warning":
    print("\n⚠️ Schema validation completed with warnings!")
else:
    print("\n❌ Schema validation failed!")