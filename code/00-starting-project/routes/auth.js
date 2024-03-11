const express = require("express");

const getSignup = require("../controllers/auth-controller");
const getLogin = require("../controllers/auth-controller");
const signup = require("../controllers/auth-controller");
const login = require("../controllers/auth-controller");
const logout = require("../controllers/auth-controller");

const router = express.Router();

router.get("/signup", getSignup(req, res));

router.get("/login", getLogin(req, res));

router.post("/signup", signup(req, res));

router.post("/login", login(req, res));

router.post("/logout", logout(req, res));

module.exports = router;
