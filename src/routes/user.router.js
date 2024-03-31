const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// sample
router.route("/sample").get(userController.sample);

module.exports = router;
