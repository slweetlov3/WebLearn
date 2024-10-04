import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS)
app.use(express.static('public'));

// Route to get a joke
app.post('/get-joke', async (req, res) => {
    const name = req.body.name;
    try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
        const jokeData = response.data;

        let joke = '';
        if (jokeData.type === 'single') {
            joke = jokeData.joke;
        } else {
            joke = `${jokeData.setup} ... ${jokeData.delivery}`;
        }

        // Insert the user's name into the joke
        joke = joke.replace(/(Chuck Norris|someone|somebody|they|he|she)/gi, name);

        res.send(joke);
    } catch (error) {
        res.send('Failed to fetch joke');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});