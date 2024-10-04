//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true }));

var password = "";
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

function passwordGenerator(req, res, next) {
    console.log(req.body);
    password = req.body["password"];
    next();
  }
  
app.use(passwordGenerator);

app.post("/check", (req,res) => {
  if (password=="ILoveProgramming") {
    res.sendFile(__dirname +"/public/secret.html");
  }
  else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});