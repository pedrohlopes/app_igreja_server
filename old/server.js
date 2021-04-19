const http = require("https");
var url = require( "url" );
var qs = require("querystring");
const concat = require('concat-stream');


const host = 'localhost';
const port = 8030;
let data = [];
let resp = {};
let jsonData = []
const fs = require('fs')


const requestListener = function handler(req, res) {
    var POST = {};
    res.setHeader("Access-Control-Allow-Origin","*")
    //res.header("Access-Control-Allow-Origin", "*");
    if (req.method == 'POST') {
        req.on('data', function(data) {
            data = data.toString();
            data = data.split('&');
            resp = JSON.parse(data);
            console.log(resp);
            fs.writeFile("./config.json", JSON.stringify(resp), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
        })
    
    }
    if (req.method == 'GET') {
        fs.readFile('./config.json', 'utf8', (err, jsonString) => {
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
        
        
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});