const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
});

router.get("/new-post", async function (req, res) {
  const [authors, metadata] = await db.query("SELECT * FROM authors");
  res.render("create-post", { authors: authors });
});

router.post("/posts", async function (req, res) {
  const postData = req.body;

  await db.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?)",
    postData
  );

  res.redirect("/posts");
});

module.exports = router;
