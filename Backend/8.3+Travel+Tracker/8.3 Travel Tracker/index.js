import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  password: "171204",
  database: "world",
  port: 5432
});


db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let countries = [];
let totals = 0;

async function checkVisisted() {
  const result = await db.query("Select * FROM visited_countries");
  // result.rows.forEach((country) => {
  //   countries.push(country.country_code);
  // }); Đây là solution của bài 
  const countries = result.rows.map(country => country.country_code); //nó sẽ cho ra kết quả tương tự nhưng ngắn gọn hơn
  return countries;
};




app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  totals = countries.length;
  res.render("index.ejs", {countries : countries, total : totals}); //res.render để gửi dữ liệu của countries và totals vào index.ejs
});

app.post("/add", async(req,res) => {
  let input = req.body.country; 
  try{
  const country_code = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE $1", [`%${input.toLowerCase()}%`]);
  let add_country = country_code.rows[0].country_code;
  try {
  const result = await db.query("INSERT INTO visited_countries (country_code) VALUES($1)", [add_country]);
  res.redirect("/");
  } catch(error) {
  const countries = await checkVisisted();
  res.render("index.ejs", {countries: countries, total: countries.length, error: "Country had already been added , please try again"});
  }
  
} catch(error) {
  const countries = await checkVisisted();
  res.render("index.ejs",{countries: countries, total: countries.length, error: "Country does not exist, please try again"});
}

});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
