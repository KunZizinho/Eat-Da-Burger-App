var express = require('express');
var burger = require("../models/burger");
var router = express.Router();

router.get("/", function (req, res) {
    burger.all(function (data) {
        console.log("All data is here  linija 7 controllera", {
            burgers:data
        })
        res.render("index", {
            burgers: data
        });
    });
});

router.post("/api/burgers", function (req, res) {
    console.log("linija 17 controllera", req.body)
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, false /*req.body.devoured*/
    ], function (result) {
        console.log('alooooooo linija 23 controllera', result)
        res.redirect("/");
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition linija 31 controllera", condition);
    console.log(" linija 32 controllerarequest.body: ",req.body.Devour);
    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            console.log("linija 37 controllera")
            return res.status(404).end();
        } else {
            res.status(200).end();
            console.log("linija 41 controllera")
        }
    });
});


module.exports = router;