const ApiError = require("../utils/ApiError");
const Board = require("../models/Board");

const createBoard = async (board) => {
  try {
    const existingBoard = await Board.findOne({
      userId: board.userId,
      name: board.name,
    });
    if (existingBoard)
      return { status: false, message: "board's name existed!" };

    await Board.create(board);
    return { status: true };
  } catch (error) {
    return new ApiError(400, error.message);
  }
};

module.exports = {
  createBoard,
};
