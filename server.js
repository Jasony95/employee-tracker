const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  },
  console.log('connected to company_db')
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})