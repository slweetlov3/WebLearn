
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const myApiKey= "e22dd5cb63b6cd357235b14c9fbb1463";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})