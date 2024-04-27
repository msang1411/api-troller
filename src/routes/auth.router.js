const express = require("express");
const router = express.Router();
const { userValidate } = require("../helpers/validator");
const { userOptionalSchema, userSchema } = require("../models/schemas");
const authController = require("../controllers/auth.controller");

router.route("/check-access-token").get(authController.checkTokenExpired);

router.route("/refresh-token").post(authController.refreshToken);

router
  .route("/sign-in")
  .post(userValidate(userOptionalSchema), authController.signIn);

router.route("/sign-up").post(userValidate(userSchema), authController.signUp);

module.exports = router;
