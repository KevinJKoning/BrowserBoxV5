import type { SchemaValidation } from '../schema-config';

export const sampleDataSchema: SchemaValidation = {
	id: "sample-data-schema",
	title: "Sample Data Schema Validation", 
	description: "Validate the structure and content of the sample_data.parquet file against expected schema requirements.",
	filename: "sample_data_schema_validation.py",
	expectations: {
		description: "Sample dataset should contain mixed data types with proper structure and constraints",
		columns: {
			"user_id": {
				type: "string",
				required: true,
				null_allowed: false,
				description: "Unique user identifier"
			},
			"timestamp": {
				type: "datetime",
				required: true,
				null_allowed: false,
				description: "Event timestamp"
			},
			"value": {
				type: "float64",
				required: true,
				min_value: -1000,
				max_value: 1000,
				null_allowed: true,
				description: "Measured value"
			},
			"status": {
				type: "string",
				required: true,
				allowed_values: ["active", "inactive", "pending", "suspended"],
				max_categories: 4,
				null_allowed: false,
				description: "User status"
			},
			"count": {
				type: "int64",
				required: false,
				min_value: 0,
				null_allowed: true,
				description: "Count of events"
			}
		},
		expected_row_count: {
			min: 50,
			max: 50000
		}
	},
	dependencies: [
		{
			type: 'uploaded',
			sourceId: 'identity'
		}
	],
	content: `import pandas as pd
import numpy as np
import json
import os
from datetime import datetime

def validate_sample_data_schema():
    """Validate sample_data.parquet against expected schema."""
    file_path = "/data/sample_data.parquet"
    
    # Schema expectations (matching TypeScript interface)
    expected_schema = {
        "user_id": {"type": "string", "required": True, "null_allowed": False},
        "timestamp": {"type": "datetime", "required": True, "null_allowed": False},
        "value": {"type": "float64", "required": True, "min_value": -1000, "max_value": 1000, "null_allowed": True},
        "status": {"type": "string", "required": True, "allowed_values": ["active", "inactive", "pending", "suspended"], "max_categories": 4, "null_allowed": False},
        "count": {"type": "int64", "required": False, "min_value": 0, "null_allowed": True}
    }
    
    expected_row_count = {"min": 50, "max": 50000}
    
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
                elif expected_dtype == "datetime" and ("datetime" in actual_dtype or "timestamp" in actual_dtype):
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
        output_path = "/data/sample_data_schema_validation_results.json"
        with open(output_path, 'w') as f:
            json.dump(validation_result, f, indent=2)
        
        print("\\n" + "="*60)
        print("SCHEMA VALIDATION RESULTS")
        print("="*60)
        print(f"Overall Status: {validation_result['overall_status'].upper()}")
        print(f"Total Checks: {total_checks}")
        print(f"Passed: {passed}")
        print(f"Failed: {failed}")
        print(f"Warnings: {warnings}")
        print(f"\\nValidation results saved to: {output_path}")
        
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
        print("\\nFull traceback:")
        print(traceback.format_exc())
        
        return error_result

# Execute the validation
print("Sample Data Schema Validation")
print("="*60)
result = validate_sample_data_schema()

if result["overall_status"] == "pass":
    print("\\n✅ Schema validation passed!")
elif result["overall_status"] == "warning":
    print("\\n⚠️ Schema validation completed with warnings!")
else:
    print("\\n❌ Schema validation failed!")`,
	category: "validation"
};