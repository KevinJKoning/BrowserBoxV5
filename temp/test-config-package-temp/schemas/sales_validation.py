import pandas as pd
import json
import os
from datetime import datetime

def validate_sales_data():
    """Validate sales_data.csv against expected schema."""
    file_path = "/data/sales_data.csv"
    
    # Expected schema for sales data
    expected_schema = {
        "date": {"type": "string", "required": True, "null_allowed": False},
        "customer_id": {"type": "int64", "required": True, "min_value": 1, "null_allowed": False},
        "product_id": {"type": "int64", "required": True, "min_value": 1, "null_allowed": False},
        "amount": {"type": "float64", "required": True, "min_value": 0, "max_value": 10000, "null_allowed": False},
        "quantity": {"type": "int64", "required": True, "min_value": 1, "max_value": 100, "null_allowed": False}
    }
    
    expected_row_count = {"min": 10, "max": 100000}
    
    try:
        if not os.path.exists(file_path):
            return {
                "overall_status": "fail",
                "column_validations": [],
                "summary": {"total_checks": 1, "passed": 0, "failed": 1, "warnings": 0},
                "validation_timestamp": datetime.now().isoformat(),
                "metadata": {"error": f"File not found: {file_path}"}
            }
        
        print(f"Validating sales data: {file_path}")
        df = pd.read_csv(file_path)
        
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
                col_data = df[col_name]
                col_validation["actual_type"] = str(col_data.dtype)
                
                # Type validation (simplified)
                expected_dtype = expectations["type"]
                actual_dtype = str(col_data.dtype)
                
                type_check = {"check": "data_type", "expected": expected_dtype, "actual": actual_dtype}
                if ("int" in expected_dtype and "int" in actual_dtype) or \
                   ("float" in expected_dtype and ("float" in actual_dtype or "int" in actual_dtype)) or \
                   ("string" in expected_dtype and "object" in actual_dtype):
                    type_check["status"] = "pass"
                    type_check["message"] = "Data type compatible"
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
                
                # Range validation for numeric columns
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
        
        # Save validation results
        output_path = "/data/sales_validation_results.json"
        with open(output_path, 'w') as f:
            json.dump(validation_result, f, indent=2)
        
        print(f"\nSales Data Validation Results:")
        print(f"=============================")
        print(f"Overall Status: {validation_result['overall_status'].upper()}")
        print(f"Total Checks: {total_checks}")
        print(f"Passed: {passed}")
        print(f"Failed: {failed}")
        print(f"Warnings: {warnings}")
        print(f"Validation results saved to: {output_path}")
        
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
        
        print(f"Error during validation: {str(e)}")
        return error_result

# Execute validation
print("Sales Data Schema Validation")
print("=" * 40)
result = validate_sales_data()

if result["overall_status"] == "pass":
    print("\n✅ Sales data validation passed!")
elif result["overall_status"] == "warning":
    print("\n⚠️ Sales data validation completed with warnings!")
else:
    print("\n❌ Sales data validation failed!")