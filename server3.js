// Dependencies
var express = require("express");
var mysql = require("mysql");

// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wizard_schools_db"
});

// Initiate MySQL Connection.
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Routes
app.get("/cast", function(req, res) {

    // If the main route is hit, then we initiate a SQL query to grab all records.
    // All of the resulting records are stored in the variable "result."
    connection.query("SELECT * FROM teachers order by id DESC", function(err, result) {

        // We then begin building out HTML elements for the page.
        var html = "<h1 style='color: cornflowerblue ;'> My Teachers List </h1>";
        html += "<h3> the most recent ones</h3>"

        // Here we begin an unordered list.
        html += "<ul>";

        // We then use the retrieved records from the database to populate our HTML file.
        for (var i = 0; i < result.length; i++) {
            html += "<li><p> ID: " + result[i].id + "</p>";
            html += "<p>Teacher Name: " + result[i].name + " </p></li>";
            html += "<p>Teacher School: " + result[i].address + " </p></li>";
            html += "<p>Teacher Coolness points: " + result[i].coolnessPoint + " </p></li>";
        }

        // We close our unordered list.
        html += "</ul>";

        // Finally we send the user the HTML file we dynamically created.
        res.send(html);
    });
});

app.get("/coolness-point", function(req, res) {

    // If the main route is hit, then we initiate a SQL query to grab all records.
    // All of the resulting records are stored in the variable "result."
    connection.query("SELECT * FROM teachers order by coolnessPoint Desc", function(err, result) {

        // We then begin building out HTML elements for the page.
        var html = "<h1 style='color: #a662ed ;'> My Teachers List </h1>";
        html += "<h3> Sorted by colness point</h3>"


        // Here we begin an unordered list.
        html += "<ul>";

        // We then use the retrieved records from the database to populate our HTML file.
        for (var i = 0; i < result.length; i++) {
            html += "<li><p> ID: " + result[i].id + "</p>";
            html += "<p>Teacher Name: " + result[i].name + " </p></li>";
            html += "<p>Teacher School: " + result[i].address + " </p></li>";
            html += "<p>Teacher Coolness points: " + result[i].coolnessPoint + " </p></li>";
        }

        // We close our unordered list.
        html += "</ul>";

        // Finally we send the user the HTML file we dynamically created.
        res.send(html);
    });
});
app.get("/attitude-chart/:att", function(req, res) {

    // If the main route is hit, then we initiate a SQL query to grab all records.
    // All of the resulting records are stored in the variable "result."
    var attr = req.params.att;

    var query = "SELECT * FROM teachers where name = '"+attr+"' OR address ='"+attr+"' OR coolnessPoint = '"+attr+"' order by coolnessPoint Desc";
    console.log(query);

    connection.query(query, function(err, result) {

        // We then begin building out HTML elements for the page.
        var html = "<h1 style='color: #ed4b2f ;'> My Teachers List </h1>";
        html += "<h3> searched by attr </h3>"


        // Here we begin an unordered list.
        html += "<ul>";

        // We then use the retrieved records from the database to populate our HTML file.
        for (var i = 0; i < result.length; i++) {
            html += "<li><p> ID: " + result[i].id + "</p>";
            html += "<p>Teacher Name: " + result[i].name + " </p></li>";
            html += "<p>Teacher School: " + result[i].address + " </p></li>";
            html += "<p>Teacher Coolness points: " + result[i].coolnessPoint + " </p></li>";
        }

        // We close our unordered list.
        html += "</ul>";

        // Finally we send the user the HTML file we dynamically created.
        res.send(html);
    });
});
// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});
