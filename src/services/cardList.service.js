const ApiError = require("../utils/ApiError");
const CardList = require("../models/CardList");

const createCardList = async (cardList) => {
  try {
    const existingCardList = await CardList.findOne({
      boardId: cardList.boardId,
      name: cardList.name,
    });
    if (existingCardList)
      return { status: false, message: "CardList's name existed!" };

    await CardList.create(cardList);
    return { status: true };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const deleteCardList = async (cardListId) => {
  try {
    const cardList = await CardList.findById(cardListId);
    if (!cardList) return { status: false, message: "CardList doesn't exist!" };
    if (cardList.isDelete)
      return { status: false, message: "CardList has been deleted!" };

    Object.assign(cardList, { isDelete: true, deleteAt: Date.now() });
    await cardList.save();

    return {
      status: true,
      message: "CardList has deleted successfully!",
    };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const getCardListById = async (cardListId) => {
  try {
    const cardList = await CardList.findById(cardListId);
    if (!cardList) return { status: false, message: "CardList doesn't exist!" };

    return {
      status: true,
      message: "Get CardList successfully!",
      data: cardList,
    };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const getCardListList = async (limit, page, filters) => {
  const cardListList = await CardList.find(filters)
    .skip((page - 1) * limit)
    .limit(limit);
  const count = cardListList.length;

  return {
    message: `Get board list by limit: ${limit}, page: ${page} successfully!`,
    count,
    limit,
    page,
    data: cardListList,
  };
};

const updateCardList = async (cardListId, cardList) => {
  try {
    const existingCardList = await CardList.findById(cardListId);
    if (!existingCardList)
      return { status: false, message: "CardList doesn't exist!" };

    Object.assign(existingCardList, cardList);

    const updatedCardList = await existingCardList.save();
    return {
      status: true,
      message: "CardList updated successfully",
      data: updatedCardList,
    };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

module.exports = {
  createCardList,
  deleteCardList,
  getCardListById,
  getCardListList,
  updateCardList,
};
