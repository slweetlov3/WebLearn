import express from "express";

const app = express();
const port = 3000;

app.get("/", (req,res) => {

    const today = new Date("June 29, 2024 11:20:00");
    const day = today.getDay();

    let type= "A weekday";
    let adv = "LOL";

    if (day === 0 || day === 6) {
        type = "a weekend";
        adv = "Go sleep bro";
    }

    res.render("index.ejs",{
        dayType: type,
        advice: adv,}
        )
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})