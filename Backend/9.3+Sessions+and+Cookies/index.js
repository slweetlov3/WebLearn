import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";


const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: "TOPSECRETWORD",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, //1 ngày.
  }
}));

app.use(passport.initialize());
app.use(passport.session());



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
  const email = req.body.username;
  const password = req.body.password;

  try { 
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, err => {
            console.log(err);
            res.redirect("/secrets");
          })
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});
//nghĩa là nó chạy mớ dưới kia, nếu như thành công => secrets, sai => cút vào login
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));

app.get("/secrets", (req, res) => {
  // console.log(req.user);
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});

passport.use( new Strategy(async function verify(username,password, cb){
  
  
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (result) {
            return cb(null, user); // Nghĩa là khi ta req đến /secrets thì nó sẽ là user này 
          } else {
            return cb(err, false); //Nghĩa là đăng nhập thất cmn bại
          }
        }
      });
    } else {
      return cb("User not found");
    }
  } catch (err) {
    console.log(err);
    return cb(err);
  }
}));


//Tuần tự hóa user, lưu dữ liệu vào local store
passport.serializeUser((user,cb) => {
  cb(null, user);
})

//Tương tự, và cả 2 kết hợp: nó lưu thông tin của người dùng vào local session, khi mình cần dùng tt đấy thì
//Nó sẽ giải tuần tự hóa nó trở lại theo cách để ta có thể truy cập được. 
passport.deserializeUser((user,cb) => {
  cb(null, user);
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
