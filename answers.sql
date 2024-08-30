-- PROBLEM 1
-- Select all of the email addresses from the customers table in alphabetical order.

SELECT email
FROM customers
ORDER BY email
ASC;

-- PROBLEM 2
-- Write a query that lists the order ids for all orders placed by customers with the first name Elizabeth and last name Crocker. Use a SUBQUERY to do this, not a join.

SELECT id
FROM orders
WHERE customer_id =
    (SELECT id
    FROM customers
    WHERE id = 1);

-- PROBLEM 3
-- Write a query that gets the total number of cupcakes from unprocessed orders.

SELECT sum(num_cupcakes)
FROM orders
WHERE processed = 'f';

-- PROBLEM 4
-- Write a query that shows the name of each cupcake and the sum of cupcakes ordered for that cupcake type (for both processed and unprocessed orders), sorted in ascending alphabetical order of cupcake name. The report should show all cupcake types, even if they have not been ordered at all.

SELECT c.name, --first column with customer name
       CASE -- second column is a case statement
           WHEN SUM(o.num_cupcakes) IS NULL THEN 0 -- If the sum is null, return 0
           ELSE SUM(o.num_cupcakes) -- Otherwise, return the sum
       END AS sum -- Alias the sum
FROM cupcakes AS c
LEFT JOIN orders AS o ON c.id = o.cupcake_id
GROUP BY c.name
ORDER BY c.name 
ASC;

-- PROBLEM 5
-- Write a query that shows the email address of each customer and the total number of cupcakes they’ve ordered. Results should be sorted by total number of cupcakes, in descending order.

SELECT c.email, --first column with customer email
       CASE -- second column is a case statement
           WHEN SUM(o.num_cupcakes) IS NULL THEN 0 -- If the sum is null, return 0
           ELSE SUM(o.num_cupcakes) -- Otherwise, return the sum
       END AS sum -- Alias the sum
FROM customers AS c -- customers with alias c
LEFT JOIN orders AS o -- orders with alias o
ON c.id = o.customer_id
GROUP BY c.email
ORDER BY sum
DESC;


-- PROBLEM 6
-- Write a query that selects the first name, last name and email address of customers who have processed orders of funfetti cupcakes. Even if a customer has multiple outstanding orders of funfetti, their email should only appear once.

SELECT DISTINCT c.fname, c.lname, c.email 
FROM customers AS c -- customers with alias c
JOIN orders AS o -- orders with alias o
ON c.id = o.customer_id
JOIN cupcakes AS cp -- cupcakes with alias cp
ON o.cupcake_id = cp.id
WHERE cp.name = 'funfetti' 
AND o.processed = 't';