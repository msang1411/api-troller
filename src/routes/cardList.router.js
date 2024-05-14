const express = require("express");
const router = express.Router();
const {
  dataValidate,
  filtersValidate,
  paramsValidate,
  queryValidate,
} = require("../helpers/validator");
const {
  cardListSchema,
  cardListFiltersSchema,
  cardListUpdatePosition,
  cardListUpdateSchema,
  idSchema,
  paginationSchema,
} = require("../models/schemas");
const cardListController = require("../controllers/cardList.controller");
const { verifyAccessToken } = require("../authentication/authentication");

router
  .route("/create")
  .post(
    dataValidate(cardListSchema),
    verifyAccessToken,
    cardListController.createCardList
  );

router
  .route("/delete/:id")
  .delete(
    paramsValidate(idSchema),
    verifyAccessToken,
    cardListController.deleteCardList
  );

router
  .route("/get-all")
  .post(
    filtersValidate(cardListFiltersSchema),
    verifyAccessToken,
    cardListController.getAllCardList
  );

router
  .route("/get-list")
  .post(
    queryValidate(paginationSchema),
    filtersValidate(cardListFiltersSchema),
    verifyAccessToken,
    cardListController.getCardListByPage
  );

router
  .route("/update/:id")
  .put(
    paramsValidate(idSchema),
    dataValidate(cardListUpdateSchema),
    verifyAccessToken,
    cardListController.updateCardList
  );

router
  .route("/update-many")
  .put(verifyAccessToken, cardListController.updateManyCardList);

router
  .route("/update-position")
  .put(
    dataValidate(cardListUpdatePosition),
    verifyAccessToken,
    cardListController.updatePositionCardList
  );

router
  .route("/:id")
  .get(
    paramsValidate(idSchema),
    verifyAccessToken,
    cardListController.getCardListById
  );

module.exports = router;
