import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "171204",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM items ORDER BY id asc");
  items = result.rows;
  res.render("index.ejs", {
    listTitle: "Today works",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try{
  await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
  res.redirect("/");
} catch (error){
    console.log(error);
  }
  
});

app.post("/edit", async (req, res) => {
  const edit = req.body.updatedItemTitle;
  const edit_id = req.body.updatedItemId;
  try {await db.query(
    "UPDATE items SET title = $1 WHERE id = $2",
    [edit, edit_id]
  );
  res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try{
    await db.query(
      "DELETE FROM items WHERE id = $1",
      [id]
    );
    res.redirect("/");
  } catch(error){
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
