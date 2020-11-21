const express = require("express");
const morgan = require("morgan");

// express app.
const app = express();

// register view engine.
// app.set() let us configure the app settings.
app.set("view engine", "ejs"); // ejs look for the view dir by default.

// listens for request.
app.listen(3000);

// middleware & static files.
app.use(express.static("static"));
app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log("new request made");
//   console.log("host:", req.hostname);
//   console.log("path:", req.path);
//   console.log("method:", req.method);
//   next();
// });

app.get("/", (req, res) => {
  // res.send("Hello WORld");

  // // The second argument will make the directory of the file related to the project's directory
  // res.sendFile("./views/index.html", { root: __dirname });

  const blogs = [
    { title: "blog 1", snippet: "lorem ipsum" },
    { title: "blog 2", snippet: "lorem ipsum" },
    { title: "blog 3", snippet: "lorem ipsum" },
  ];

  // render ejs view.
  res.render("index", { title: "home", blogs });
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
