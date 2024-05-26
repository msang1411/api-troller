const cardService = require("../services/card.service");

const createCard = async (req, res, next) => {
  try {
    const result = await cardService.createCard(req.value.body);
    if (result.status === true) {
      return res.status(200).json({
        statusCode: 200,
        message: `${req.value.body.name} created`,
      });
    } else {
      return res.status(409).json({
        statusCode: 409,
        message: result.message,
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const result = await cardService.deleteCard(req.value.params.id);

    if (result.status === false)
      return res.status(400).json({
        statusCode: 400,
        message: result.message,
      });
    else
      return res.status(200).json({
        statusCode: 200,
        message: result.message,
      });
  } catch (error) {
    next(error);
  }
};

const getAllCard = async (req, res, next) => {
  try {
    const result = await cardService.getCardList(null, null, req.value.filters);

    return res.status(200).json({
      statusCode: 200,
      message: "Get all card successfully!",
      count: result.count,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getCardById = async (req, res, next) => {
  try {
    const result = await cardService.getCardById(req.value.params.id);
    if (result.status === false)
      return res.status(400).json({
        statusCode: 400,
        message: result.message,
      });

    return res.status(200).json({
      statusCode: 200,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getCardByPage = async (req, res, next) => {
  try {
    const result = await cardService.getCardList(
      req.value.query.limit,
      req.value.query.page,
      req.value.filters
    );

    return res.status(200).json({
      statusCode: 200,
      message: result.message,
      count: result.count,
      limit: result.limit,
      page: result.page,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const updateCard = async (req, res, next) => {
  try {
    const result = await cardService.updateCard(
      req.value.params.id,
      req.value.body
    );
    if (result.status === false)
      return res.status(400).json({ statusCode: 400, message: result.message });

    return res.status(200).json({
      statusCode: 200,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const updateManyCards = async (req, res, next) => {
  try {
    const result = await cardService.updateManyCards(req.body.cards);
    if (result.status === false)
      return res.status(400).json({ statusCode: 400, message: result.message });

    return res.status(200).json({
      statusCode: 200,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const updatePositionCard = async (req, res, next) => {
  try {
    const result = await cardService.updatePositionCard(req.value.body);

    if (result.status)
      return res.status(200).json({
        statusCode: 200,
        message: result.message,
        data: result.data,
      });
    else
      return res.status(400).json({
        statusCode: 400,
        message: result.message,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCard,
  deleteCard,
  getAllCard,
  getCardById,
  getCardByPage,
  updateCard,
  updateManyCards,
  updatePositionCard,
};
