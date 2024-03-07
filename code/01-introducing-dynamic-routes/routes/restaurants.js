const express = require("express");

const restaurantData = require("../util/restaurant-data");
const uuid = require("uuid");

const router = express.Router();

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === "desc") {
    nextOrder = "asc";
  }

  const restaurants = restaurantData.getStoredRestaurants();

  restaurants.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
    nextOrder: nextOrder,
  });
});

router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;

  const restaurants = restaurantData.getStoredRestaurants();

  const searchedRestaurant = restaurants.find(
    (restaurant) => restaurant.id === restaurantId
  );

  if (!searchedRestaurant) {
    res.status(404).render("404");
  }

  res.render("restaurant-detail", {
    restaurant: searchedRestaurant,
  });
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();

  const restaurants = restaurantData.getStoredRestaurants();

  restaurants.push(restaurant);

  restaurantData.storeRestaurants(restaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
