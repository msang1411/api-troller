const express = require("express");
const router = express.Router();
const {
  dataValidate,
  filtersValidate,
  paramsValidate,
  queryValidate,
} = require("../helpers/validator");
const {
  cardSchema,
  cardFiltersSchema,
  cardUpdateSchema,
  cardUpdatePositionSchema,
  idSchema,
  paginationSchema,
} = require("../models/schemas");
const cardController = require("../controllers/card.controller");
const { verifyAccessToken } = require("../authentication/authentication");

router
  .route("/create")
  .post(dataValidate(cardSchema), verifyAccessToken, cardController.createCard);

router
  .route("/delete/:id")
  .delete(
    paramsValidate(idSchema),
    verifyAccessToken,
    cardController.deleteCard
  );

router.route("/get-all").post(
  filtersValidate(cardFiltersSchema),
  // verifyAccessToken,
  cardController.getAllCard
);

router
  .route("/get-list")
  .post(
    queryValidate(paginationSchema),
    filtersValidate(cardFiltersSchema),
    verifyAccessToken,
    cardController.getCardByPage
  );

router
  .route("/update/:id")
  .put(
    paramsValidate(idSchema),
    dataValidate(cardUpdateSchema),
    verifyAccessToken,
    cardController.updateCard
  );

router
  .route("/update-many")
  .put(verifyAccessToken, cardController.updateManyCards);

router.route("/update-position").put(
  dataValidate(cardUpdatePositionSchema),
  // verifyAccessToken,
  cardController.updatePositionCard
);

router
  .route("/:id")
  .get(paramsValidate(idSchema), verifyAccessToken, cardController.getCardById);

module.exports = router;
