const boardService = require("../services/board.service");

const createBoard = async (req, res, next) => {
  try {
    const result = await boardService.createBoard(req.value.body);
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

const getAllBoard = async (req, res, next) => {
  try {
    const result = await boardService.getBoardList(
      null,
      null,
      req.value.filters
    );

    return res.status(200).json({
      message: result.message,
      count: result.count,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getBoardById = async (req, res, next) => {
  try {
    const result = await boardService.getBoardById(req.value.params.id);
    if (result.status === false)
      return res.status(400).json({
        message: result.message,
      });

    return res.status(200).json({
      message: result.message,
      data: result.board,
    });
  } catch (error) {
    next(error);
  }
};

const getBoardByPage = async (req, res, next) => {
  try {
    const result = await boardService.getBoardList(
      req.value.query.limit,
      req.value.query.page,
      req.value.filters
    );

    return res.status(200).json({
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

const updateBoard = async (req, res, next) => {
  try {
    const result = await boardService.updateBoard(
      req.value.params.id,
      req.value.body
    );
    if (result.status === false)
      return res.status(400).json({ message: result.message });

    return res.status(200).json({
      message: result.message,
      data: result.board,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBoard,
  getAllBoard,
  getBoardById,
  getBoardByPage,
  updateBoard,
};
