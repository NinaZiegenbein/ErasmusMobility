// (A) LOAD DB MODULE
const mysql = require("mysql");

// (B) CREATE CONNECTION - CHANGE TO YOUR OWN !
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'erasmus_mobility_data'
});
db.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

// (C) QUERY
db.query("SELECT * FROM `staff_2008`", function (err, results) {
  if (err) { throw err; }
  console.log(results);
});

