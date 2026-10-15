
# Week 9 – SQL Injection Homework

## Introduction

In this assignment, I learned how SQL injection works and how to prevent it.

I completed five practical labs using PortSwigger Web Security Academy. I also created two TypeScript files to demonstrate the difference between vulnerable SQL queries and safe parameterized queries.

## 1. What is SQL Injection?

SQL injection is a security vulnerability that occurs when an application includes user input directly in an SQL query.

An attacker may be able to change how the database interprets the query.

Possible consequences include:

- Accessing information without permission
- Bypassing authentication
- Reading sensitive database information
- Changing the intended behavior of SQL queries

SQL injection can be prevented by using parameterized queries.

## 2. PortSwigger Labs

### Lab 1 – SQL Injection Login Bypass

**Status:** Solved

**Objective:**
Understand how SQL injection can bypass a login system.

**What I did:**
I tested the login functionality in the PortSwigger practice environment.

I used SQL injection to change the login query and successfully accessed the administrator account.

**What I learned:**
SQL injection can allow authentication bypass when user input is handled incorrectly.

### Lab 2 – UNION Attack: Retrieving Data from Other Tables

**Status:** Solved

**Objective:**
Understand how UNION SELECT can retrieve information from another database table.

**What I did:**
I tested the product category filter and used UNION SELECT to retrieve data from the users table.

Example:

```sql
' UNION SELECT username,password FROM users--
```

I then used the administrator credentials in the lab to complete the exercise.

**What I learned:**
A vulnerable SQL query may allow data from other tables to appear in application results.

### Lab 3 – UNION Attack: Determining the Number of Columns

**Status:** Solved

**Objective:**
Find out how many columns are returned by the original SQL query.

**What I did:**
I tested ORDER BY with different column numbers.

Example:

```sql
' ORDER BY 3--
```

The query worked with three columns, but using four produced an internal server error.

I then tested:

```sql
' UNION SELECT NULL,NULL,NULL--
```

The lab was completed successfully.

**What I learned:**
ORDER BY and UNION SELECT can be used to determine the number of columns in a vulnerable query.

### Lab 4 – UNION Attack: Finding a Column Containing Text

**Status:** Solved

**Objective:**
Identify which column can contain text.

**What I did:**
I tested a UNION SELECT query with a text value in the second column.

Example:

```sql
' UNION SELECT NULL,'x0tfxh',NULL--
```

The application accepted the query and the lab was solved.

**What I learned:**
UNION SELECT requires compatible data types, and testing text values can help identify suitable columns.

### Lab 5 – UNION Attack: Retrieving Multiple Values in One Column

**Status:** Solved

**Objective:**
Retrieve multiple database values using a single text column.

**What I did:**
I tested the category filter and confirmed that the query returned two columns.

I then combined the username and password into one text value.

Example:

```sql
' UNION SELECT NULL,username||':'||password FROM users--
```

The results displayed the username and password together.

I used the administrator credentials to complete the lab.

**What I learned:**
String concatenation can combine multiple database values into a single column.

## 3. TypeScript – Vulnerable SQL Query

**File:** vulnerable.ts

I created a function called getProducts() that builds an SQL query using string concatenation.

Normal input:

```text
Gifts
```

Unsafe input:

```text
Gifts' OR 1=1--
```

The unsafe input changes the structure of the generated SQL query.

This demonstrates why inserting user input directly into SQL is dangerous.

The example prints the SQL query without connecting to a real database.

## 4. TypeScript – Secure SQL Query

**File:** secure.ts

I created a second version using a parameterized SQL query.

The query uses a placeholder:

```sql
SELECT * FROM products WHERE category = $1
```

The input is stored separately:

```typescript
values: [category]
```

This allows the database driver to handle user input as data instead of SQL instructions.

The TypeScript example demonstrates the structure of a safe query. It does not execute the query against a database.

## 5. Vulnerable vs Secure Queries

| Vulnerable Query | Secure Query |
|---|---|
| Uses string concatenation | Uses parameters |
| Includes input directly in SQL | Keeps input separate |
| Can change query behavior | Treats input as data |
| Vulnerable to SQL injection | Protects against SQL injection when executed correctly |

## 6. Conclusion

In this assignment, I completed five SQL injection labs and learned how different vulnerabilities can affect database queries.

I practiced login bypass, UNION SELECT, column counting, finding text columns, and combining values.

I also created two TypeScript examples showing the difference between vulnerable and secure SQL queries.

The most important lesson is that user input should never be inserted directly into SQL queries.

Parameterized queries are an important method for protecting applications against SQL injection.

## 7. Sources

1. PortSwigger Web Security Academy – SQL Injection
   https://portswigger.net/web-security/sql-injection

2. PortSwigger Web Security Academy – UNION Attacks
   https://portswigger.net/web-security/sql-injection/union-attacks

3. OWASP – SQL Injection Prevention Cheat Sheet
   https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html

4. PostgreSQL Documentation
   https://www.postgresql.org/docs/current/sql.html