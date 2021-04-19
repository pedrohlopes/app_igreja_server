var express = require('express');
var url = require( "url" );
var qs = require("querystring");
var fs = require("fs");
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
  //res.header("Access-Control-Allow-Origin", "*");
  if (req.method == 'GET') {
    fs.readFile('./data/config.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err)
        return
      }
      console.log(jsonString)
      jsonData = JSON.parse(jsonString)
      console.log(jsonData)
      res.setHeader("Content-Type", "application/json");
          
      res.writeHead(200);
      res.end(JSON.stringify(jsonData));
    })
      
  };
  
  
});
router.post('/', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
  if (req.body.hasOwnProperty('reservas')) {
    fs.writeFile("./data/config.json", JSON.stringify(req.body), function (err) {
      if (err) {
        console.log(err);
      }
    });
  console.log(req.body);  
  }
      // your JSON
  res.send(req.body);
});
module.exports = router;
