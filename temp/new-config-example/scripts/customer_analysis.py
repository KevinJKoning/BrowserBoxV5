import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def main():
    """Analyze customer data and purchasing behavior"""
    
    # Load the bundled data files
    customers = pd.read_csv('customer_info.csv')
    sales = pd.read_csv('sample_sales.csv')
    
    print("=== Customer Analysis Report ===\n")
    
    # Merge customer info with sales data
    customer_sales = sales.merge(customers, on='customer_id', how='left')
    
    # Basic customer statistics
    print("Customer Overview:")
    print(f"Total customers: {len(customers)}")
    print(f"Average age: {customers['age'].mean():.1f} years")
    print(f"Age range: {customers['age'].min()} - {customers['age'].max()} years")
    print()
    
    # Segment analysis
    segment_stats = customers['segment'].value_counts()
    print("Customer Segments:")
    for segment, count in segment_stats.items():
        percentage = (count / len(customers)) * 100
        print(f"  {segment}: {count} customers ({percentage:.1f}%)")
    print()
    
    # Purchase behavior by segment
    segment_revenue = customer_sales.groupby('segment').agg({
        'revenue': ['sum', 'mean', 'count'],
        'quantity': 'sum'
    }).round(2)
    
    print("Revenue by Customer Segment:")
    for segment in segment_revenue.index:
        total_rev = segment_revenue.loc[segment, ('revenue', 'sum')]
        avg_order = segment_revenue.loc[segment, ('revenue', 'mean')]
        orders = segment_revenue.loc[segment, ('revenue', 'count')]
        units = segment_revenue.loc[segment, ('quantity', 'sum')]
        
        print(f"  {segment}:")
        print(f"    Total revenue: ${total_rev:.2f}")
        print(f"    Average order value: ${avg_order:.2f}")
        print(f"    Total orders: {orders}")
        print(f"    Units purchased: {units}")
    print()
    
    # Age group analysis
    customers['age_group'] = pd.cut(customers['age'], bins=[0, 30, 40, 50, 100], 
                                   labels=['Under 30', '30-39', '40-49', '50+'])
    
    customer_sales_age = customer_sales.merge(customers[['customer_id', 'age_group']], on='customer_id')
    age_revenue = customer_sales_age.groupby('age_group')['revenue'].agg(['sum', 'mean', 'count'])
    
    print("Revenue by Age Group:")
    for age_group in age_revenue.index:
        total = age_revenue.loc[age_group, 'sum']
        avg = age_revenue.loc[age_group, 'mean']
        count = age_revenue.loc[age_group, 'count']
        print(f"  {age_group}: ${total:.2f} total, ${avg:.2f} avg, {count} orders")
    print()
    
    # Customer lifetime value
    customer_ltv = customer_sales.groupby('customer_id').agg({
        'revenue': 'sum',
        'quantity': 'sum'
    }).sort_values('revenue', ascending=False)
    
    print("Top 3 Customers by Lifetime Value:")
    for customer_id, row in customer_ltv.head(3).iterrows():
        customer_info = customers[customers['customer_id'] == customer_id].iloc[0]
        revenue = row['revenue']
        quantity = row['quantity']
        print(f"  {customer_id} ({customer_info['name']}): ${revenue:.2f}, {quantity} units")
    print()
    
    # Create visualizations
    plt.figure(figsize=(15, 10))
    
    # Segment distribution
    plt.subplot(2, 3, 1)
    plt.pie(segment_stats.values, labels=segment_stats.index, autopct='%1.1f%%')
    plt.title('Customer Segment Distribution')
    
    # Revenue by segment
    plt.subplot(2, 3, 2)
    segment_revenue_total = customer_sales.groupby('segment')['revenue'].sum()
    plt.bar(segment_revenue_total.index, segment_revenue_total.values, color=['skyblue', 'lightcoral'])
    plt.title('Total Revenue by Segment')
    plt.xlabel('Segment')
    plt.ylabel('Revenue ($)')
    
    # Age distribution
    plt.subplot(2, 3, 3)
    plt.hist(customers['age'], bins=8, edgecolor='black', alpha=0.7)
    plt.title('Customer Age Distribution')
    plt.xlabel('Age')
    plt.ylabel('Number of Customers')
    
    # Revenue by age group
    plt.subplot(2, 3, 4)
    age_revenue_total = customer_sales_age.groupby('age_group')['revenue'].sum()
    plt.bar(age_revenue_total.index, age_revenue_total.values, color='lightgreen')
    plt.title('Revenue by Age Group')
    plt.xlabel('Age Group')
    plt.ylabel('Revenue ($)')
    
    # Average order value by segment
    plt.subplot(2, 3, 5)
    avg_order_by_segment = customer_sales.groupby('segment')['revenue'].mean()
    plt.bar(avg_order_by_segment.index, avg_order_by_segment.values, color='orange')
    plt.title('Average Order Value by Segment')
    plt.xlabel('Segment')
    plt.ylabel('Average Order Value ($)')
    
    # Customer lifetime value distribution
    plt.subplot(2, 3, 6)
    plt.hist(customer_ltv['revenue'], bins=5, edgecolor='black', alpha=0.7, color='purple')
    plt.title('Customer Lifetime Value Distribution')
    plt.xlabel('Lifetime Value ($)')
    plt.ylabel('Number of Customers')
    
    plt.tight_layout()
    plt.savefig('customer_analysis_report.png', dpi=150, bbox_inches='tight')
    plt.show()
    
    print("Customer analysis complete! Visualization saved as 'customer_analysis_report.png'")

if __name__ == "__main__":
    main()