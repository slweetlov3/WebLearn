import express from "express";
const app = express();
const port = 3000;
 

app.get("/", (req, res) => {
    res.send("<h1>Hello MTFK</h1>");
});

app.get("/Contact", (req, res) => {
    res.send("<h1>Phone: 0919xxxxxxxx</h1>");
});

app.get("/About", (req, res) => {
    res.send("<h1>About Me</h1> <p>skaoskaoskaoskosako</p>");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}. `);
});