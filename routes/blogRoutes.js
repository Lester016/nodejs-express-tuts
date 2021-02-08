const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.blog_index);

router.post("/", blogController.blog_create_post);

router.get("/create", blogController.blog_create_get);

router.get("/:id", blogController.blog_details);

router.delete("/:id", blogController.blog_delete);

// testing mongoDB
// mongoose and mongo sandbox routes.
router.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "first blog",
    snippet: "snippet of the first blog",
    body: "body of the first blog!",
  });

  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

module.exports = router;
