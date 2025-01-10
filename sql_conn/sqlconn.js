const mysql = require('mysql2');

// Create a connection to the Azure MySQL database
const connection = mysql.createPool({
  host: 'posdb.mysql.database.azure.com', // Azure MySQL hostname
  user: 'postest',           // Include `@hostname` with the username
  password: 'Bcptest123',                     // Your Azure MySQL password
  database: 'pos',                // The database you want to use
  port: 3306,                                    // Default MySQL port
  ssl: {
    rejectUnauthorized: true                     // Ensure SSL encryption is used
  }
});

// Connect to the database
/*
connection.pool((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the Azure MySQL database!');
});

// Export the connection for use in other modules
*/
module.exports = connection;