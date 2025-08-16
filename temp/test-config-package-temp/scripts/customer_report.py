import pandas as pd
import numpy as np
import os

def generate_customer_report():
    """Generate customer analysis report."""
    customer_file = "/data/customers.csv"
    sales_file = "/data/sales_data.csv"
    
    try:
        if not os.path.exists(customer_file):
            print(f"Customer data file not found: {customer_file}")
            print("Please upload customers.csv using the 'Customer Information' upload.")
            return None
            
        print(f"Loading customer data from: {customer_file}")
        customers = pd.read_csv(customer_file)
        
        print(f"\nCustomer Data Overview:")
        print(f"======================")
        print(f"Total customers: {len(customers)}")
        print(f"Columns: {list(customers.columns)}")
        
        # Basic customer statistics
        if 'age' in customers.columns:
            print(f"\nCustomer Demographics:")
            print(f"=====================")
            print(f"Average age: {customers['age'].mean():.1f}")
            print(f"Age range: {customers['age'].min()} - {customers['age'].max()}")
            
        if 'city' in customers.columns:
            print(f"\nTop Cities:")
            print(f"===========")
            city_counts = customers['city'].value_counts().head(5)
            for city, count in city_counts.items():
                print(f"{city}: {count} customers")
        
        # Try to combine with sales data if available
        if os.path.exists(sales_file):
            print(f"\nCombining with sales data...")
            sales = pd.read_csv(sales_file)
            
            if 'customer_id' in customers.columns and 'customer_id' in sales.columns:
                # Merge customer and sales data
                merged = customers.merge(sales, on='customer_id', how='left')
                
                if 'amount' in merged.columns:
                    customer_sales = merged.groupby('customer_id')['amount'].agg(['sum', 'count', 'mean']).reset_index()
                    customer_sales.columns = ['customer_id', 'total_spent', 'num_orders', 'avg_order']
                    
                    # Save customer analysis
                    output_path = "/data/customer_analysis.csv"
                    customer_sales.to_csv(output_path, index=False)
                    print(f"✓ Customer analysis saved to: {output_path}")
                    
                    print(f"\nCustomer Sales Summary:")
                    print(f"======================")
                    print(f"Customers with purchases: {len(customer_sales[customer_sales['total_spent'] > 0])}")
                    print(f"Average customer value: ${customer_sales['total_spent'].mean():.2f}")
                    print(f"Top customer spent: ${customer_sales['total_spent'].max():.2f}")
        
        print(f"\n✓ Customer report completed successfully!")
        return True
        
    except Exception as e:
        print(f"Error generating customer report: {str(e)}")
        return None

# Execute the report
print("Customer Analysis Report")
print("=" * 40)
result = generate_customer_report()

if result:
    print("\n📊 Customer report generated!")
else:
    print("\n❌ Customer report failed.")