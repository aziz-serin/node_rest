const express = require('express');
const mysql = require('mysql');

const con = mysql.createConnection({
    user: "root",
    password: "password",
    database: "radioco_db",
    host:"localhost"
});

con.connect(function (err){
    if(err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE hooks (hook JSON)";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
