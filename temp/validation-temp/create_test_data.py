import pandas as pd
import numpy as np

# Set random seed for reproducibility
np.random.seed(42)

# Create valid random data
def create_valid_data():
    n_rows = 500
    data = {
        'id': range(1, n_rows + 1),
        'age': np.random.randint(18, 80, n_rows),
        'income': np.random.uniform(25000, 150000, n_rows),
        'category': np.random.choice(['A', 'B', 'C', 'D'], n_rows),
        'score': np.random.uniform(0, 100, n_rows)
    }
    
    # Add some null values to score (which allows nulls)
    null_indices = np.random.choice(n_rows, size=50, replace=False)
    data['score'] = list(data['score'])
    for idx in null_indices:
        data['score'][idx] = None
    
    df = pd.DataFrame(data)
    df.to_parquet('random_data_valid.parquet', index=False)
    print(f"Created valid dataset with {len(df)} rows")
    print(f"Columns: {list(df.columns)}")
    print(f"Data types: {df.dtypes.to_dict()}")
    print(f"Null counts: {df.isnull().sum().to_dict()}")

# Create invalid data - missing required column
def create_invalid_missing_column():
    n_rows = 200
    data = {
        'id': range(1, n_rows + 1),
        'age': np.random.randint(18, 80, n_rows),
        'income': np.random.uniform(25000, 150000, n_rows),
        # Missing 'category' column
        'score': np.random.uniform(0, 100, n_rows)
    }
    
    df = pd.DataFrame(data)
    df.to_parquet('random_data_invalid_missing_category.parquet', index=False)
    print(f"Created invalid dataset (missing category) with {len(df)} rows")

# Create invalid data - age out of range
def create_invalid_age_range():
    n_rows = 300
    data = {
        'id': range(1, n_rows + 1),
        'age': np.concatenate([
            np.random.randint(18, 80, n_rows - 50),  # Valid ages
            np.random.randint(200, 300, 30),         # Invalid high ages
            np.random.randint(-10, 0, 20)           # Invalid negative ages
        ]),
        'income': np.random.uniform(25000, 150000, n_rows),
        'category': np.random.choice(['A', 'B', 'C', 'D'], n_rows),
        'score': np.random.uniform(0, 100, n_rows)
    }
    
    df = pd.DataFrame(data)
    df.to_parquet('random_data_invalid_age_range.parquet', index=False)
    print(f"Created invalid dataset (bad ages) with {len(df)} rows")
    print(f"Age range: {df['age'].min()} to {df['age'].max()}")

# Create invalid data - invalid categories
def create_invalid_categories():
    n_rows = 250
    data = {
        'id': range(1, n_rows + 1),
        'age': np.random.randint(18, 80, n_rows),
        'income': np.random.uniform(25000, 150000, n_rows),
        'category': np.concatenate([
            np.random.choice(['A', 'B', 'C', 'D'], n_rows - 50),  # Valid categories
            np.random.choice(['E', 'F', 'X', 'Y', 'Z'], 50)      # Invalid categories
        ]),
        'score': np.random.uniform(0, 100, n_rows)
    }
    
    df = pd.DataFrame(data)
    df.to_parquet('random_data_invalid_categories.parquet', index=False)
    print(f"Created invalid dataset (bad categories) with {len(df)} rows")
    print(f"Unique categories: {sorted(df['category'].unique())}")

# Create invalid data - income too high
def create_invalid_income_range():
    n_rows = 180
    data = {
        'id': range(1, n_rows + 1),
        'age': np.random.randint(18, 80, n_rows),
        'income': np.concatenate([
            np.random.uniform(25000, 150000, n_rows - 30),  # Valid incomes
            np.random.uniform(1500000, 2000000, 30)         # Invalid high incomes
        ]),
        'category': np.random.choice(['A', 'B', 'C', 'D'], n_rows),
        'score': np.random.uniform(0, 100, n_rows)
    }
    
    df = pd.DataFrame(data)
    df.to_parquet('random_data_invalid_income_range.parquet', index=False)
    print(f"Created invalid dataset (high income) with {len(df)} rows")
    print(f"Income range: ${df['income'].min():,.2f} to ${df['income'].max():,.2f}")

# Create too few rows (under minimum)
def create_invalid_too_few_rows():
    n_rows = 50  # Under minimum of 100
    data = {
        'id': range(1, n_rows + 1),
        'age': np.random.randint(18, 80, n_rows),
        'income': np.random.uniform(25000, 150000, n_rows),
        'category': np.random.choice(['A', 'B', 'C', 'D'], n_rows),
        'score': np.random.uniform(0, 100, n_rows)
    }
    
    df = pd.DataFrame(data)
    df.to_parquet('random_data_invalid_too_few_rows.parquet', index=False)
    print(f"Created invalid dataset (too few rows) with {len(df)} rows")

if __name__ == "__main__":
    print("Creating test datasets for validation...")
    print("=" * 50)
    
    create_valid_data()
    print()
    create_invalid_missing_column() 
    print()
    create_invalid_age_range()
    print()
    create_invalid_categories()
    print()
    create_invalid_income_range()
    print()
    create_invalid_too_few_rows()
    
    print("\n" + "=" * 50)
    print("All test datasets created successfully!")