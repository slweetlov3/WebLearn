import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "171204",
  port: 5432,
});

db.connect();


app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
  const checkResult = await db.query("SELECT * FROM users WHERE email = $", [username]);

  if (checkResult.rows.length > 0) {
    res.send("Email already exists. Try logging in.");
    
  } else {
  
  const result = await db.query("INSERT INTO users (email,password) VALUES($1, $2)", [username, password]);
  console.log(result);
  res.render("secret.ejs");
  }} catch(err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  try {
    const fetchUser = await db.query("SELECT * FROM users WHERE email = $", [username]);
    if (fetchUser.rows.length >0) {
      const user = fetchUser.rows[0];
      if (user.password === password) {
        res.render("secret.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err){
    console.log(err);
  };
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
