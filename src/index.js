const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extened:false}));
app.use(bodyParser.json());

// create a mysql connection
const con = mysql.createConnection({
    user: "root",
    password: "password",
    database: "radioco_db",
    host:"localhost"
});

// connect to database
con.connect(function (err){
    if(err) throw err;
    console.log("Connected!");
    // Create table to store hooks
    var sql = "CREATE TABLE IF NOT EXISTS hooks (type VARCHAR(255), event_id VARCHAR(255), occured_at DATETIME, episode_id VARCHAR(255), podcast_id VARCHAR(255))";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
// configure the reciever
app.post('/hook', async (req,res)=>{
   const resourseUrl = req.body.resource_url;
   // print the request body to verify you recieve it
   var body = req.body;
   // this is the time field given to me in the requirements script
   let type = body["type"];
   let event_id = body.event_id;
   let occured_at = body.occurred_at;
   let episode_id = body["data"].episode_id;
   let podcast_id = body["data"].podcast_id

   con.connect(function (err){
      var sql = "INSERT INTO hooks (type, event_id, occured_at, episode_id, podcast_id) VALUES (?,?,?,?,?)";
      let insert = [type, event_id, occured_at, episode_id, podcast_id];
      con.query(sql, insert, function (err, result){
          if(err) throw err;
          console.log("Inserted hook into the DB");
      })
   });
   // Let the sender now everything is OK
   res.sendStatus(200);
});



// server will listen on port 3000
let server = app.listen(3000, function(){
    console.log(`Listening on port ${server.address().port}`);
});


