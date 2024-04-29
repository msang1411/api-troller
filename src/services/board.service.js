const ApiError = require("../utils/ApiError");
const Board = require("../models/Board");

const createBoard = async (board) => {
  try {
    const existingBoard = await Board.findOne({
      userId: board.userId,
      name: board.name,
    });
    if (existingBoard)
      return { status: false, message: "Board's name existed!" };

    await Board.create(board);
    return { status: true };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const getBoardById = async (boardId) => {
  try {
    const board = await Board.findById(boardId);
    if (!board) return { status: false, message: "Board doesn't exist!" };

    return {
      status: true,
      message: "Get board successfully!",
      board,
    };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const getBoardList = async (limit, page, filters) => {
  const boardList = await Board.find(filters)
    .skip((page - 1) * limit)
    .limit(limit);
  const count = boardList.length;

  return {
    message: `Get board list by limit: ${limit}, page: ${page} successfully!`,
    count,
    limit,
    page,
    data: boardList,
  };
};

const updateBoard = async (boardId, board) => {
  try {
    const existingBoard = await Board.findById(boardId);
    if (!existingBoard)
      return { status: false, message: "Board doesn't exist!" };

    // update property of board for existingBoard
    Object.assign(existingBoard, board);

    const updatedBoard = await existingBoard.save();
    return {
      status: true,
      message: "Board updated successfully",
      board: updatedBoard,
    };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

module.exports = {
  createBoard,
  getBoardById,
  getBoardList,
  updateBoard,
};
