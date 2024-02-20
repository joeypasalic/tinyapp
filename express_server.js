const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

const generateRandomString = function() {
//function picks a random character from chars string 6 times for our random string
  const length = 6;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomString += chars[randomIndex];
  }

  return randomString;
};

app.set("view engine", "ejs");

//our urls to display
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
//convert the request body from a Buffer into readable string
app.use(express.urlencoded({ extended: true}));

//when url ends with just / (home page) it will say hello
app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});


app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  console.log(req.body); //log the POST request body to console
  res.send(generateRandomString()); //outputs as a way for me to test it for now
});

//handler to link the short and long urls WITHOUT redirecting instantly
app.get("/urls/:id", (req, res) => {
  const id = req.params.id;
  const longURL = urlDatabase[id];
  if (longURL) {
    const templateVars = { id, longURL };
    res.render("urls_show", templateVars);
  }
  
  /*else {
    res.status(404).send("Error - Short URL not found!");
  }*/
});

