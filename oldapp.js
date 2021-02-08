const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app.
const app = express();

// connect to mongoDB
const dbURI =
  "mongodb://finance-app:vSKSsQqDNDcpxfBT@cluster0-shard-00-00.zxtf6.mongodb.net:27017,cluster0-shard-00-01.zxtf6.mongodb.net:27017,cluster0-shard-00-02.zxtf6.mongodb.net:27017/finance-app?ssl=true&replicaSet=atlas-8gcmuw-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine.
// app.set() let us configure the app settings.
app.set("view engine", "ejs"); // ejs look for the view dir by default.

// middleware & static files.
app.use(express.static("static"));
app.use(morgan("dev"));

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "hello wlrodl",
    snippet: "123123",
    body: "32132131",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/single-blog", (req, res) => {
  Blog.findById("5fbba05fbc039b82a5e40063")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      // // The second argument will make the directory of the file related to the project's directory
      // res.sendFile("./views/index.html", { root: __dirname });

      // render ejs view.
      res.render("index", { title: "home", blogs: result });
    })
    .catch((err) => console.log(err));
});

app.get("/about", (req, res) => {
  // res.send("about page");

  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "about" });
});

// Redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create-blog" });
});

// use method indicate that for every request it will run.
// We put it the the most bottom so that if node didn't find any match url.
// Then this will be triggered
app.use((req, res) => {
  res.status(404).render("404");
});
