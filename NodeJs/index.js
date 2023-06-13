import fs from "fs";
 import http from "http"; 
 import path from "path";

import gfName from "./features.js";
import {gfName1,gfName2} from "./features.js";
import * as myObj from "./features.js";
import generateLove from "./feature2.js";

console.log('1', gfName, gfName1,gfName2);

const love = fs.readFileSync("./love.html");
console.log('2', generateLove(), "fsmfmdsfnmm");
console.log('3', path.extname("./name.html"))
console.log('4', path.dirname("./home/blog/name.html"))

const server = http.createServer((req, res) => {
    console.log('5', req.method);
    if(req.url === "/"){
        res.end("<h1>Home page</h1>");
    } 
    else if(req.url === "/about"){
        res.end(`<h1>${gfName} page</h1>`);
    }
    else if(req.url === "/contact"){
        res.end(`Love is ${generateLove()}`);
    }
    else if(req.url === "/named"){
        fs.readFile("./name.html", (err, data) => {
            console.log('2', data); 
            res.end(data);
        });
    }
    else if(req.url === "/loved"){
        res.end(love);
    }
    else {
        res.end("<h1>Page nor</h1>");
    }
})

server.listen(5000, () => {
    console.log("server started");

})

