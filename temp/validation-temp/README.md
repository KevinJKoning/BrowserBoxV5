# Validation Test Datasets

This directory contains test datasets for testing the JavaScript and Python validation rules in the default configuration package.

## JavaScript Validation Test Data (for "identity" file requirement - sample_data.csv)

**Validation Rules:**
- Required columns: `id`, `name`
- `id`: number, minimum value = 1, cannot be null
- `name`: string, cannot be null, must match pattern `^[A-Za-z\s]+$` (letters and spaces only)
- Row count: minimum = 1, maximum = 100,000

### Test Files:

1. **`sample_data_valid.csv`** ✅ **SHOULD PASS**
   - 20 rows with valid data
   - All IDs are positive integers (1-20)
   - All names contain only letters and spaces
   - Contains both required columns

2. **`sample_data_invalid_missing_id.csv`** ❌ **SHOULD FAIL**
   - Missing required `id` column
   - Only has `name` column
   - 5 rows of data

3. **`sample_data_invalid_bad_names.csv`** ❌ **SHOULD FAIL**
   - Contains invalid characters in name field:
     - "Mary Johnson123" (contains numbers)
     - "Robert@Brown" (contains @)
     - "Michael Wilson!" (contains !)
     - "David123 Taylor" (contains numbers)
     - "Christopher_Jackson" (contains underscore)

4. **`sample_data_invalid_negative_ids.csv`** ❌ **SHOULD FAIL**
   - Contains IDs below minimum value of 1:
     - ID = -1 (negative)
     - ID = 0 (below minimum)
     - ID = -5 (negative)

## Python Validation Test Data (for "random_data" file requirement - random_data.parquet)

**Validation Rules:**
- Required columns: `id` (int64, min=1), `age` (int64, 0-150), `income` (float64, 0-1,000,000), `category` (string, values: A/B/C/D)
- Optional columns: `score` (float64, 0-100, nulls allowed)
- Row count: minimum = 100, maximum = 100,000

### Test Files:

1. **`random_data_valid.parquet`** ✅ **SHOULD PASS**
   - 500 rows of valid data
   - All columns present with correct types
   - `id`: 1-500 (valid range)
   - `age`: 18-79 (valid range)
   - `income`: $25,000-$150,000 (valid range)
   - `category`: Only A, B, C, D values
   - `score`: 0-100 with some null values (allowed)

2. **`random_data_invalid_missing_category.parquet`** ❌ **SHOULD FAIL**
   - 200 rows of data
   - Missing required `category` column
   - All other columns valid

3. **`random_data_invalid_age_range.parquet`** ❌ **SHOULD FAIL**
   - 300 rows of data
   - Contains invalid ages:
     - 30 rows with ages 200-299 (above maximum of 150)
     - 20 rows with ages -10 to -1 (below minimum of 0)

4. **`random_data_invalid_categories.parquet`** ❌ **SHOULD FAIL**
   - 250 rows of data
   - Contains invalid category values:
     - 50 rows with categories E, F, X, Y, Z (not in allowed A/B/C/D)

5. **`random_data_invalid_income_range.parquet`** ❌ **SHOULD FAIL**
   - 180 rows of data
   - Contains incomes above maximum:
     - 30 rows with incomes $1.5M-$2M (above maximum of $1M)

6. **`random_data_invalid_too_few_rows.parquet`** ❌ **SHOULD FAIL**
   - Only 50 rows of data (below minimum of 100 rows)
   - All individual data values are valid
   - Fails on row count constraint

## Usage Instructions

### For JavaScript Validation:
1. Upload any of the `sample_data_*.csv` files to the "Sample Dataset" file requirement
2. Run the "Sample Data Basic Validation" from the Schema Validation plugin
3. Observe whether validation passes or fails as expected

### For Python Validation:
1. Upload any of the `random_data_*.parquet` files to the "Random Data File" file requirement
2. Run the "Random Data Advanced Validation" from the Schema Validation plugin
3. Check the generated HTML report for detailed validation results

## Expected Results Summary

| File | Validation Type | Expected Result | Reason |
|------|----------------|-----------------|---------|
| `sample_data_valid.csv` | JavaScript | ✅ PASS | All rules satisfied |
| `sample_data_invalid_missing_id.csv` | JavaScript | ❌ FAIL | Missing required column |
| `sample_data_invalid_bad_names.csv` | JavaScript | ❌ FAIL | Invalid characters in names |
| `sample_data_invalid_negative_ids.csv` | JavaScript | ❌ FAIL | IDs below minimum value |
| `random_data_valid.parquet` | Python | ✅ PASS | All rules satisfied |
| `random_data_invalid_missing_category.parquet` | Python | ❌ FAIL | Missing required column |
| `random_data_invalid_age_range.parquet` | Python | ❌ FAIL | Ages outside valid range |
| `random_data_invalid_categories.parquet` | Python | ❌ FAIL | Invalid category values |
| `random_data_invalid_income_range.parquet` | Python | ❌ FAIL | Income above maximum |
| `random_data_invalid_too_few_rows.parquet` | Python | ❌ FAIL | Below minimum row count |

## File Generation

All test files were generated programmatically to ensure consistency and reproducibility. The CSV files were created manually with specific test cases, while the Parquet files were generated using the `create_test_data.py` script with pandas and numpy for realistic data distributions.