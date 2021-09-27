var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "Nina",
  password: "IskIadUBWS18"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
