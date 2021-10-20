const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");


const serverPath = path.join(__dirname, "./view");

const server = http.createServer((req, resp) => {
    //console.log(req.url);
    fs.readFile(`${serverPath}${req.url}.html`, { encoding: "ascii" }, (error, file) => {
        if (error) {
            resp.writeHead(404, { "Content-Type": "text/html" });
            resp.write(`File Not Found ${error.message}`);
            resp.end();
        }
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.write(file);
        resp.end();
    }
    );
});

server.listen(1000);
console.log("Started on 1000");