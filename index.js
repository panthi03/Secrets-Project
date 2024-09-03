//To see how the final website should work, run "node index.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
var userAuthenticated = false;

function authenticate(req, res, next){
    if(req.body["password"]=="ILoveProgramming"){
        userAuthenticated = true;
    }
    next();
}

app.use(authenticate);

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res)=>{
    if(userAuthenticated){
        console.log("User authorised!");
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        console.log("User is not authorised!");
        res.sendFile(__dirname + "/public/index.html");
    }
    
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});