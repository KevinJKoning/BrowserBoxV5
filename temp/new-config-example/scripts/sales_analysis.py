import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

def main():
    """Analyze sales data and generate insights"""
    
    # Load the bundled sales data
    df = pd.read_csv('sample_sales.csv')
    
    print("=== Sales Data Analysis Report ===\n")
    
    # Basic statistics
    print("Dataset Overview:")
    print(f"Total transactions: {len(df)}")
    print(f"Date range: {df['date'].min()} to {df['date'].max()}")
    print(f"Unique customers: {df['customer_id'].nunique()}")
    print(f"Unique products: {df['product_id'].nunique()}")
    print()
    
    # Revenue analysis
    total_revenue = df['revenue'].sum()
    avg_order_value = df['revenue'].mean()
    
    print("Revenue Insights:")
    print(f"Total revenue: ${total_revenue:,.2f}")
    print(f"Average order value: ${avg_order_value:.2f}")
    print(f"Highest single order: ${df['revenue'].max():.2f}")
    print()
    
    # Customer analysis
    customer_stats = df.groupby('customer_id').agg({
        'revenue': ['sum', 'count'],
        'quantity': 'sum'
    }).round(2)
    
    print("Top Customers by Revenue:")
    top_customers = customer_stats.sort_values(('revenue', 'sum'), ascending=False).head(3)
    for customer_id, row in top_customers.iterrows():
        revenue = row[('revenue', 'sum')]
        orders = row[('revenue', 'count')]
        print(f"  {customer_id}: ${revenue:.2f} ({orders} orders)")
    print()
    
    # Product analysis
    product_stats = df.groupby('product_id').agg({
        'revenue': 'sum',
        'quantity': 'sum'
    }).sort_values('revenue', ascending=False)
    
    print("Product Performance:")
    for product_id, row in product_stats.iterrows():
        revenue = row['revenue']
        quantity = row['quantity']
        print(f"  {product_id}: ${revenue:.2f} revenue, {quantity} units sold")
    print()
    
    # Create visualizations
    plt.figure(figsize=(12, 8))
    
    # Daily revenue trend
    plt.subplot(2, 2, 1)
    daily_revenue = df.groupby('date')['revenue'].sum()
    plt.plot(daily_revenue.index, daily_revenue.values, marker='o')
    plt.title('Daily Revenue Trend')
    plt.xlabel('Date')
    plt.ylabel('Revenue ($)')
    plt.xticks(rotation=45)
    
    # Revenue by customer
    plt.subplot(2, 2, 2)
    customer_revenue = df.groupby('customer_id')['revenue'].sum().sort_values(ascending=True)
    plt.barh(customer_revenue.index, customer_revenue.values)
    plt.title('Revenue by Customer')
    plt.xlabel('Revenue ($)')
    
    # Product sales
    plt.subplot(2, 2, 3)
    product_quantity = df.groupby('product_id')['quantity'].sum()
    plt.bar(product_quantity.index, product_quantity.values)
    plt.title('Units Sold by Product')
    plt.xlabel('Product ID')
    plt.ylabel('Units Sold')
    
    # Order value distribution
    plt.subplot(2, 2, 4)
    plt.hist(df['revenue'], bins=10, edgecolor='black', alpha=0.7)
    plt.title('Order Value Distribution')
    plt.xlabel('Order Value ($)')
    plt.ylabel('Frequency')
    
    plt.tight_layout()
    plt.savefig('sales_analysis_report.png', dpi=150, bbox_inches='tight')
    plt.show()
    
    print("Analysis complete! Visualization saved as 'sales_analysis_report.png'")

if __name__ == "__main__":
    main()