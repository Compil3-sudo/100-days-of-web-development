const path = require("path");

const express = require("express");
const session = require("express-session");
const csrf = require("csurf");

// CUSTOM MIDDLEWARES
const authMiddleware = require("./middlewares/auth-middleware");
const addCSRFTokenMiddleware = require("./middlewares/csrf-token-middleware");

// CONFIG
const sessionConfig = require("./config/session");
const db = require("./data/database");

// ROUTES
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

// MONGODB
const mongoDbSessionStore = sessionConfig.createSessionStore(session);

// EXPRESS
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionConfig.createSessionConfig(mongoDbSessionStore)));
app.use(csrf());

app.use(addCSRFTokenMiddleware);

// CUSTOM MIDDLEWARES
app.use(authMiddleware);

// ROUTES
app.use(authRoutes);
app.use(blogRoutes);

app.use(function (error, req, res, next) {
  res.render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
