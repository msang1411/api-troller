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
  .route("/create")
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
  .route("/get-all")
  .post(
    filtersValidate(boardFiltersSchema),
    verifyAccessToken,
    boardController.getAllBoard
  );

router.route("/get-all-data-board/:id").post(
  paramsValidate(idSchema),
  // verifyAccessToken,
  boardController.getAllDataBoard
);

router
  .route("/get-list")
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
