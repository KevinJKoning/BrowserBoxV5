import pandas as pd
import json
from datetime import datetime

def validate_sales_data():
    """Validate sales data quality and structure"""
    
    # Load data
    df = pd.read_csv('sample_sales.csv')
    
    validation_results = {
        "overall_status": "pass",
        "column_validations": [],
        "summary": {
            "total_checks": 0,
            "passed": 0,
            "failed": 0,
            "warnings": 0
        },
        "validation_timestamp": datetime.now().isoformat(),
        "metadata": {
            "row_count": len(df),
            "column_count": len(df.columns)
        }
    }
    
    # Check required columns
    required_columns = ['date', 'customer_id', 'product_id', 'quantity', 'revenue']
    for col in required_columns:
        validation_results["summary"]["total_checks"] += 1
        if col in df.columns:
            validation_results["summary"]["passed"] += 1
            validation_results["column_validations"].append({
                "column": col,
                "check": "required_column",
                "status": "pass",
                "message": f"Column '{col}' is present"
            })
        else:
            validation_results["summary"]["failed"] += 1
            validation_results["overall_status"] = "fail"
            validation_results["column_validations"].append({
                "column": col,
                "check": "required_column",
                "status": "fail",
                "message": f"Required column '{col}' is missing"
            })
    
    # Validate data types and ranges
    if 'date' in df.columns:
        validation_results["summary"]["total_checks"] += 1
        try:
            pd.to_datetime(df['date'])
            validation_results["summary"]["passed"] += 1
            validation_results["column_validations"].append({
                "column": "date",
                "check": "date_format",
                "status": "pass",
                "message": "All dates are valid"
            })
        except:
            validation_results["summary"]["failed"] += 1
            validation_results["overall_status"] = "fail"
            validation_results["column_validations"].append({
                "column": "date",
                "check": "date_format",
                "status": "fail",
                "message": "Invalid date format found"
            })
    
    # Check quantity values
    if 'quantity' in df.columns:
        validation_results["summary"]["total_checks"] += 1
        if (df['quantity'] > 0).all():
            validation_results["summary"]["passed"] += 1
            validation_results["column_validations"].append({
                "column": "quantity",
                "check": "positive_values",
                "status": "pass",
                "message": "All quantity values are positive"
            })
        else:
            validation_results["summary"]["failed"] += 1
            validation_results["overall_status"] = "fail"
            validation_results["column_validations"].append({
                "column": "quantity",
                "check": "positive_values",
                "status": "fail",
                "message": "Found non-positive quantity values"
            })
    
    # Check revenue values
    if 'revenue' in df.columns:
        validation_results["summary"]["total_checks"] += 1
        if (df['revenue'] > 0).all():
            validation_results["summary"]["passed"] += 1
            validation_results["column_validations"].append({
                "column": "revenue",
                "check": "positive_values",
                "status": "pass",
                "message": "All revenue values are positive"
            })
        else:
            validation_results["summary"]["failed"] += 1
            validation_results["overall_status"] = "fail"
            validation_results["column_validations"].append({
                "column": "revenue",
                "check": "positive_values",
                "status": "fail",
                "message": "Found non-positive revenue values"
            })
    
    # Check for missing values
    for col in df.columns:
        validation_results["summary"]["total_checks"] += 1
        missing_count = df[col].isnull().sum()
        if missing_count == 0:
            validation_results["summary"]["passed"] += 1
            validation_results["column_validations"].append({
                "column": col,
                "check": "missing_values",
                "status": "pass",
                "message": f"No missing values in {col}"
            })
        else:
            validation_results["summary"]["warnings"] += 1
            validation_results["column_validations"].append({
                "column": col,
                "check": "missing_values",
                "status": "warning",
                "message": f"Found {missing_count} missing values in {col}"
            })
    
    # Check for duplicate rows
    validation_results["summary"]["total_checks"] += 1
    duplicate_count = df.duplicated().sum()
    if duplicate_count == 0:
        validation_results["summary"]["passed"] += 1
        validation_results["column_validations"].append({
            "column": "all",
            "check": "duplicate_rows",
            "status": "pass",
            "message": "No duplicate rows found"
        })
    else:
        validation_results["summary"]["warnings"] += 1
        validation_results["column_validations"].append({
            "column": "all",
            "check": "duplicate_rows",
            "status": "warning",
            "message": f"Found {duplicate_count} duplicate rows"
        })
    
    # Output results as JSON for the application to parse
    print(json.dumps(validation_results, indent=2))
    
    return validation_results

if __name__ == "__main__":
    validate_sales_data()