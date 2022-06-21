const mysql = require("mysql");

const db = mysql.createConnection({
    host : "localhost",
    user : "nodejs",
    password :"shin890518",
    database : "eflex",

});

db.connect();

module.exports = db;

