// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm");

var burger = {
  all: function(cb) {
    orm.all("burgers", function(res) {
      console.log("linija 7 modela burger")
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    console.log("linija 13 modela burger")
    orm.create("burgers", cols, vals, function(res) {
      console.log("linija 15 modela burger")
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, function(res) {
      console.log("linija 21 modela burger")
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("burgers", condition, function(res) {
      console.log("linija 27 modela burger")
      cb(res);
    });
  }
};

module.exports = burger;
