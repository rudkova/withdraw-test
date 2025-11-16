-- @param {Int} $1:userId
SELECT SUM(
               CASE
                   WHEN a.name = 'deposit' THEN p.amount
                   WHEN a.name = 'withdraw' THEN -p.amount
                   END
       ) AS balance
FROM payments p
         JOIN actions a ON p."actionId" = a.id
WHERE p."userId" = $1;