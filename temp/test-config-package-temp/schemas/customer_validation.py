import pandas as pd
import json
import os
from datetime import datetime

def validate_customer_data():
    """Validate customers.csv against expected schema."""
    file_path = "/data/customers.csv"
    
    # Expected schema for customer data
    expected_schema = {
        "customer_id": {"type": "int64", "required": True, "min_value": 1, "null_allowed": False},
        "name": {"type": "string", "required": True, "null_allowed": False},
        "email": {"type": "string", "required": True, "null_allowed": False},
        "age": {"type": "int64", "required": True, "min_value": 18, "max_value": 120, "null_allowed": False},
        "city": {"type": "string", "required": False, "null_allowed": True},
        "signup_date": {"type": "string", "required": True, "null_allowed": False}
    }
    
    expected_row_count = {"min": 5, "max": 50000}
    
    try:
        if not os.path.exists(file_path):
            return {
                "overall_status": "fail",
                "column_validations": [],
                "summary": {"total_checks": 1, "passed": 0, "failed": 1, "warnings": 0},
                "validation_timestamp": datetime.now().isoformat(),
                "metadata": {"error": f"File not found: {file_path}"}
            }
        
        print(f"Validating customer data: {file_path}")
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
                    col_validation["status"] = "warning"
                    col_validation["checks"].append({
                        "check": "column_exists",
                        "status": "warning",
                        "message": f"Optional column '{col_name}' is missing"
                    })
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
                
                # Range validation for age
                if col_name == "age" and col_data.dtype in ['int64', 'float64']:
                    min_val = float(col_data.min())
                    max_val = float(col_data.max())
                    
                    # Min age check
                    min_check = {
                        "check": "min_value",
                        "expected": expectations["min_value"],
                        "actual": min_val
                    }
                    
                    if min_val < expectations["min_value"]:
                        min_check["status"] = "fail"
                        min_check["message"] = f"Minimum age {min_val} below expected {expectations['min_value']}"
                        col_validation["status"] = "fail"
                        validation_result["overall_status"] = "fail"
                    else:
                        min_check["status"] = "pass"
                        min_check["message"] = f"Minimum age {min_val} within range"
                    
                    col_validation["checks"].append(min_check)
                    
                    # Max age check
                    max_check = {
                        "check": "max_value",
                        "expected": expectations["max_value"],
                        "actual": max_val
                    }
                    
                    if max_val > expectations["max_value"]:
                        max_check["status"] = "fail"
                        max_check["message"] = f"Maximum age {max_val} above expected {expectations['max_value']}"
                        col_validation["status"] = "fail"
                        validation_result["overall_status"] = "fail"
                    else:
                        max_check["status"] = "pass"
                        max_check["message"] = f"Maximum age {max_val} within range"
                    
                    col_validation["checks"].append(max_check)
                
                # Email format validation (basic)
                if col_name == "email":
                    email_series = col_data.dropna()
                    invalid_emails = email_series[~email_series.str.contains('@', na=False)]
                    
                    email_check = {
                        "check": "email_format",
                        "violations": list(invalid_emails) if len(invalid_emails) > 0 else []
                    }
                    
                    if len(invalid_emails) > 0:
                        email_check["status"] = "fail"
                        email_check["message"] = f"Found {len(invalid_emails)} invalid email formats"
                        col_validation["status"] = "fail"
                        validation_result["overall_status"] = "fail"
                    else:
                        email_check["status"] = "pass"
                        email_check["message"] = "All emails have valid format"
                    
                    col_validation["checks"].append(email_check)
            
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
        output_path = "/data/customer_validation_results.json"
        with open(output_path, 'w') as f:
            json.dump(validation_result, f, indent=2)
        
        print(f"\nCustomer Data Validation Results:")
        print(f"================================")
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
print("Customer Data Schema Validation")
print("=" * 40)
result = validate_customer_data()

if result["overall_status"] == "pass":
    print("\n✅ Customer data validation passed!")
elif result["overall_status"] == "warning":
    print("\n⚠️ Customer data validation completed with warnings!")
else:
    print("\n❌ Customer data validation failed!")