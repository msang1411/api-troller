const express = require("express");
const router = express.Router();
const { schemas, userValidate } = require("../helpers/validator");
const authController = require("../controllers/auth.controller");

router.route("/check-access-token").get(authController.checkTokenExpired);

router.route("/refresh-token").post(authController.refreshToken);

router
  .route("/sign-in")
  .post(userValidate(schemas.userOptionalSchema), authController.signIn);

router
  .route("/sign-up")
  .post(userValidate(schemas.userSchema), authController.signUp);

module.exports = router;
