var express = require('express');
var burger = require("../models/burger");
var router = express.Router();

router.get("/", function (req, res) {
    burger.all(function (data) {
        console.log("All data is here ", {
            burgers:data
        })
        res.render("index", {
            burgers: data
        });
    });
});

router.post("/api/burgers", function (req, res) {
    console.log(req.body)
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, false /*req.body.devoured*/
    ], function (result) {
        console.log('alooooooo', result)
        res.redirect("/");
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


module.exports = router;