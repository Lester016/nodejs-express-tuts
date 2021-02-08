const Blog = require("../models/blog"); // ODM schema
// blog_index, blog_details, blog_create_post, blog_create_get, blog_delete

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(
      (result) => res.render("index", { title: "Home", blogs: result }) // first argument is the name of the view file.
    )
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) =>
      res.render("blogDetails", { blog: result, title: result.title })
    )
    .catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Create Blog" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((response) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_delete,
  blog_create_get,
  blog_create_post,
};
