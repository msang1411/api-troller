const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
// authentication
// const passport = require("passport");
// require("../middlewares/passport");
// const authJwt = require("../middlewares/authJwt");
// const { verifyAccessToken } = require("../authentication/authentication");

router.route("/sign-up").post(authController.signUp);

module.exports = router;
