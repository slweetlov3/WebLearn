import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "slw3";
const yourPassword = "slw";
const yourAPIKey = "e121971a-60cc-403b-b2c4-1b16bbcfe2b2";
const yourBearerToken = "f8bc494e-ad31-4c9e-a17e-128f623e3dfe";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try{
  const response = axios.get("https://secrets-api.appbrewery.com/random");
  const result = response.data;
  const content = JSON.stringify(result.data);
  res.render("index.ejs",{content: JSON.content});
} catch (error){
  console.error("Failed to make request:", error.message);
}
  
});

app.get("/basicAuth", (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  try {
    const response1 = axios.get('https://secrets-api.appbrewery.com/all?page=2', {
      auth: {
          username: 'my-username',
          password: 'my-password'
      }
  })
    const result = response1.data;
    const content = JSON.stringify(result.data);
    res.render("index.ejs",{content: JSON.content});

  } catch (error){
    console.error("Failed to make request:", error.message);
  }
});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
