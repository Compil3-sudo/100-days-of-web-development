function guardRoute(req, res, next) {
  if (!res.locals.isAuth) {
    return res.redirect("/401");
  }

  // use is authenticated
  // move to next middleware
  next();
}

module.exports = guardRoute;
