const express = require("express");
const router = express.Router();
const {
  dataValidate,
  filtersValidate,
  paramsValidate,
  queryValidate,
} = require("../helpers/validator");
const {
  boardSchema,
  boardFiltersSchema,
  boardUpdateSchema,
  idSchema,
  paginationSchema,
} = require("../models/schemas");
const boardController = require("../controllers/board.controller");
const { verifyAccessToken } = require("../authentication/authentication");

router
  .route("/create-board")
  .post(
    dataValidate(boardSchema),
    verifyAccessToken,
    boardController.createBoard
  );

router
  .route("/delete/:id")
  .delete(
    paramsValidate(idSchema),
    verifyAccessToken,
    boardController.deleteBoard
  );

router
  .route("/get-all-board")
  .post(
    filtersValidate(boardFiltersSchema),
    verifyAccessToken,
    boardController.getAllBoard
  );

router
  .route("/get-list-board")
  .post(
    queryValidate(paginationSchema),
    filtersValidate(boardFiltersSchema),
    verifyAccessToken,
    boardController.getBoardByPage
  );

router
  .route("/update/:id")
  .put(
    paramsValidate(idSchema),
    dataValidate(boardUpdateSchema),
    verifyAccessToken,
    boardController.updateBoard
  );

router
  .route("/:id")
  .get(
    paramsValidate(idSchema),
    verifyAccessToken,
    boardController.getBoardById
  );

module.exports = router;
