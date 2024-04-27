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

module.exports = {
  createBoard,
};
