const cardListService = require("../services/cardList.service");

const createCardList = async (req, res, next) => {
  try {
    const result = await cardListService.createCardList(req.value.body);
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

const deleteCardList = async (req, res, next) => {
  try {
    const result = await cardListService.deleteCardList(req.value.params.id);

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

const getAllCardList = async (req, res, next) => {
  try {
    const result = await cardListService.getCardListList(
      null,
      null,
      req.value.filters
    );

    return res.status(200).json({
      statusCode: 200,
      message: "Get all card list successfully!",
      count: result.count,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getCardListById = async (req, res, next) => {
  try {
    const result = await cardListService.getCardListById(req.value.params.id);
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

const getCardListByPage = async (req, res, next) => {
  try {
    const result = await cardListService.getCardListList(
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

const getCardListWithCard = async (req, res, next) => {
  try {
    const result = await cardListService.getCardListWithCard(req.value.filters);

    return res.status(200).json({
      statusCode: 200,
      message: result.message,
      count: result.count,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const updateCardList = async (req, res, next) => {
  try {
    const result = await cardListService.updateCardList(
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

const updateManyCardList = async (req, res, next) => {
  try {
    const result = await cardListService.updateManyCardList(
      req.body.listCardList
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

const updatePositionCardList = async (req, res, next) => {
  try {
    const result = await cardListService.updatePositionCardList(req.value.body);

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
  createCardList,
  deleteCardList,
  getAllCardList,
  getCardListById,
  getCardListByPage,
  getCardListWithCard,
  updateCardList,
  updateManyCardList,
  updatePositionCardList,
};
