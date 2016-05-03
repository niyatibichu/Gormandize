/* jshint node: true */
"use strict";
var nano = require("nano")("http://localhost:5984");
var express = require("express");
var app = express();
var router = express.Router();
var bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(express.static("."));
var fs = require('fs');

var userdb = nano.use("myusers");
var restaurantdb = nano.use("restaurants");

var parameter = { include_docs: true, limit: 10, descending: true };

app.get("/rests", function (req, res) {  //for index.html
    var rest_details = [];

    restaurantdb.list(parameter, function (error, body, headers) {
        // console.log(body.rows);
        var rw = body.rows;
        rw.forEach(function (index) {
            rest_details.push(index.doc);
        }, this);
        res.send(rest_details);
    });

});

app.get("/myusers", function (req, res) { //for login
    var user_details = [];

    userdb.list(parameter, function (error, body, headers) {
        //console.log(body.rows);
        var rw1 = body.rows;
        rw1.forEach(function (index) {
            user_details.push(index.doc);
        }, this);
        res.send(user_details);
    });

});

app.post("/myusers", function (req, res) {
    // console.log(req.body);
    userdb.insert(req.body, req.body.username, function (err,body) {  });  
});

app.post("/rests", function (req, res) {
    //console.log(req.body);
    restaurantdb.insert(req.body, req.body.res_name, function (err, body) {

    });
});

app.post("/review_update", function (req, res) {
    var rev_update = [];
    var add_comment = req.body.reviews;
    // console.log(req.body.id);  
    restaurantdb.get(req.body.id, { revs_info: true }, function (err, body) {
    body.reviews.push(add_comment);
       console.log(body);
       restaurantdb.insert(body, function (err, body) {
    });
      
    });

});
app.listen(3000, function () {
    console.log("Example app listening on port 3000");
});
