/*this query allows to get all the messages and its owner info, also it can filter with a WHERE, so you can get the message from each ticket*/
SELECT m.ID AS 'MESSAGE_ID', m.TICKET_ID, u.ID AS "USER_ID",  m.TIMESTAMP AS "DATE_TIME",m.MESSAGE,u.USERNAME,u.EMAIL,u.ROL 
FROM messages AS m
INNER JOIN users AS u ON m.USER_ID = u.ID
WHERE 1=1