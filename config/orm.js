// Import MySQL connection.
var connection = require("./connection");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    console.log("linija 13 orm-a")
    arr.push("?");
  }
  console.log("linija 16 orm-a")
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    console.log("linija 26 orm-a")
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      console.log("linija 30 orm-a")
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        console.log("linija 33 orm-a")
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
      console.log("linija 39 orm-a")
    }
  }

  // translate array of strings to a single comma-separated string
  console.log(" linija 44 sql syntax: ",arr.toString());
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    console.log("linija 51 orm-a")
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        console.log("linija 55 orm-a")
        throw err;
      }
      cb(result);
      console.log("linija 59 orm-a")
    });
  },
  create: function(table, cols, vals, cb) {
    console.log("linija 63 orm-a")
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log( "linija 73 orm-a", queryString);

    connection.query(queryString, vals, function(err, result) {
      console.log("linija 76 orm-a")
      if (err) {
        console.log("linija 78 orm-a")
        throw err;
      }
      console.log("linija 81 orm-a")
      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    console.log("linija 87 orm-a")
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log("linija 95 orm-a",queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        console.log("linija 98 orm-a")
        throw err;
      }
      console.log("linija 101 orm-a")
      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    console.log("linija 106 orm-a")
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        console.log("linija 113 orm-a")
        throw err;
      }
      console.log("linija 116 orm-a")
      cb(result);
    });
  }
};

module.exports = orm;