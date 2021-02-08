const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
const port = 3000;

// database connection.
const username = "testing";
const password = "Caloy1";
const dbname = "node-tuts";
const dbURI = `mongodb://${username}:${password}@nodetest-shard-00-00.t1o3m.mongodb.net:27017,nodetest-shard-00-01.t1o3m.mongodb.net:27017,nodetest-shard-00-02.t1o3m.mongodb.net:27017/${dbname}?ssl=true&replicaSet=atlas-ze5iw0-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to database"))
  .catch((err) => console.log(err));

// register view engine.
// app.set() let us configure the app settings.
app.set("view engine", "ejs");

// listen for requests.
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

// Middlewares
app.use(express.static("static")); // express middleware for static files.
app.use(express.urlencoded({ extended: true })); // to accept form data & allow making post request
app.use(morgan("dev")); // morgan is a logger middleware.
app.use("/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// use method indicate that for every request it will run.
// We put it the the most bottom so that if node didn't find any match url.
// Then this will be triggered
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
