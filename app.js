const express = require("express");
const fs = require("fs");

// express app.
const app = express();

// listens for request.
app.listen(3000);

app.get("/", (req, res) => {
  // res.send("Hello WORld");

  // The second argument will make the directory of the file related to the project's directory
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  // res.send("about page");

  res.sendFile("./views/about.html", { root: __dirname });
});

// Redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// use method indicate that for every request it will run.
// We put it the the most bottom so that if node didn't find any match url.
// Then this will be triggered
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
