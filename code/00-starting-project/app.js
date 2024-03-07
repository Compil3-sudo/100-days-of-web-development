const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  // const indexPath = path.join(__dirname, "views", "index.html");
  // res.sendFile(indexPath);

  // this changed to render because of EJS
  res.render("index");
});

app.get("/about", function (req, res) {
  // const aboutPath = path.join(__dirname, "views", "about.html");
  // res.sendFile(aboutPath);
  res.render("about");
});

app.get("/confirm", function (req, res) {
  // const confirmPath = path.join(__dirname, "views", "confirm.html");
  // res.sendFile(confirmPath);
  res.render("confirm");
});

app.get("/recommend", function (req, res) {
  // const recommendPath = path.join(__dirname, "views", "recommend.html");
  // res.sendFile(recommendPath);
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;

  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect("/confirm");
});

app.get("/restaurants", function (req, res) {
  // const restaurantsPath = path.join(__dirname, "views", "restaurants.html");
  // res.sendFile(restaurantsPath);

  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numberOfRestaurant: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.listen(3000);
