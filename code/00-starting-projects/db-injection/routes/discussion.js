const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/discussion");
});

router.get("/discussion", async function (req, res) {
  let filter = "";

  if (req.query.author) {
    // this could allow you to close the query with ; and execute a different query
    // like DROP table...
    // filter = `WHERE author = "${req.query.author}"`;

    // use ? to enable SQL default PROTECTION
    filter = `WHERE author = ?`;
  }

  const query = `SELECT * FROM comments ${filter}`;

  console.log(query);

  // this is BAD => could allow sql injection
  // const [comments] = await db.query(query);

  // this lets MySql package inject query => PROTECTION
  // also use QUESTIONMARK (see above)
  const [comments] = await db.query(query, [req.query.author]);

  res.render("discussion", { comments: comments });
});

router.post("/discussion/comment", async function (req, res) {
  await db.query("INSERT INTO comments (author, text) VALUES (?)", [
    [req.body.name, req.body.comment],
  ]);

  res.redirect("/discussion");
});

module.exports = router;
