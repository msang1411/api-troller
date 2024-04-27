const express = require("express");
const router = express.Router();
const { dataValidate } = require("../helpers/validator");
const { boardSchema } = require("../models/schemas");
const boardController = require("../controllers/board.controller");
const { verifyAccessToken } = require("../authentication/authentication");

router
  .route("/create-board")
  .post(
    dataValidate(boardSchema),
    verifyAccessToken,
    boardController.createBoard
  );

module.exports = router;
