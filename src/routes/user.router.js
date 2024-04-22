const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyAccessToken } = require("../authentication/authentication");

// sample
router.route("/sample").get(verifyAccessToken, userController.sample);

module.exports = router;
