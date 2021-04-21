export const query = {
  createTransactionTable: `CREATE TABLE IF NOT EXISTS Transactions (id INT PRIMARY KEY,user_id INT  NOT NULL,amount FLOAT NOT NULL,type CHAR (6) NOT NULL,date_time TIMESTAMP NOT NULL,category VARCHAR (100) NOT NULL,icon_url VARCHAR NOT NULL,FOREIGN KEY (user_id) REFERENCES Users (id))`,
  createUserTable: `CREATE TABLE IF NOT EXISTS Users (id INT PRIMARY KEY,first_name VARCHAR (20) NOT NULL,last_name VARCHAR (20) NOT NULL,avatar VARCHAR NOT NULL,created_at TIMESTAMP NOT NULL)`,
  findUser: `SELECT u.id, u.first_name, u.last_name, u.avatar, u.created_at, SUM(amount) as amount, 
  COUNT(t.Id::INT) as transactions, t.category, t.icon_url FROM users
  AS u JOIN transactions as t ON u.id = t.user_id WHERE u.id = $1 AND t.date_time > 
  (SELECT 'now'::timestamp - '12 month'::interval as dateValue) AND t.category IN 
  (SELECT DISTINCT category FROM transactions WHERE user_id = $2 AND date_time IN
  (SELECT date_time FROM transactions WHERE user_id = $3 AND date_time > 
  (select 'now'::timestamp - '7 month'::interval as dateVal))) 
  GROUP BY(u.id, t.category, t.category, t.icon_url)`,
  findOtherUsers:`SELECT u.id, u.first_name, u.last_name, u.avatar, u.created_at, COUNT(ts.id) AS transactions FROM users AS u JOIN transactions AS ts ON u.id = ts.user_id WHERE u.id != $1 AND
  ts.date_time > (select 'now'::timestamp - '12 month'::interval as dateValue) 
  AND category IN (SELECT DISTINCT category FROM transactions WHERE user_id = $2 AND 
  date_time IN (SELECT date_time FROM transactions WHERE user_id = $3 
  AND date_time > (select 'now'::timestamp - '7 month'::interval as dateVal)))
  GROUP BY (u.id)`,
  findUserDetails: `SELECT id, first_name, last_name, avatar, created_at FROM users WHERE id = $1`,
}