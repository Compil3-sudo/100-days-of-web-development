const express = require("express");

const blogController = require("../controllers/post-controller");
const guardRoute = require("../middlewares/auth-protection-middleware");

const router = express.Router();

router.get("/", blogController.getHome);

// all the routes after this line will be protected by the middleware
router.use(guardRoute);
// alternatively you could also use a filter

// this will only guard this route
// router.get("/admin", guardRoute, blogController.getAdmin);

router.get("/admin", blogController.getAdmin);

router.post("/posts", blogController.createPost);

router.get("/posts/:id/edit", blogController.getSinglePost);

router.post("/posts/:id/edit", blogController.updatePost);

router.post("/posts/:id/delete", blogController.deletePost);

module.exports = router;
