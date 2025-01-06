const connection = require('./sqlconn');

// First, switch to the database 'pos'
connection.query('USE pos;', (err) => {
  if (err) {
    console.error('Error switching database:', err.message);
    return;
  }

  // Then, run your SELECT query after successfully switching the database
  connection.query('SELECT * FROM menu;', (err, results) => {
    if (err) {
      console.error('Error running query:', err.message);
      return;
    }
    console.log('Query result:', results);

    // Close the connection after the query
    connection.end();
  });
});