const ApiError = require("../utils/ApiError");
const Card = require("../models/Card");

const createCard = async (card) => {
  try {
    const existingCard = await Card.findOne({
      cardListId: card.cardListId,
      name: card.name,
    });
    if (existingCard) return { status: false, message: "Card's name existed!" };

    await Card.create(card);
    return { status: true };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const deleteCard = async (cardId) => {
  try {
    const card = await Card.findById(cardId);
    if (!card) return { status: false, message: "Card doesn't exist!" };
    if (card.isDelete)
      return { status: false, message: "Card has been deleted!" };

    Object.assign(card, { isDelete: true, deleteAt: Date.now() });
    await card.save();

    return {
      status: true,
      message: "Card has deleted successfully!",
    };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const getCardById = async (cardId) => {
  try {
    const card = await Card.findById(cardId);
    if (!card) return { status: false, message: "Card doesn't exist!" };

    return {
      status: true,
      message: "Get card successfully!",
      data: card,
    };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const getCardList = async (limit, page, filters) => {
  const card = await Card.find(filters)
    .skip((page - 1) * limit)
    .limit(limit);
  const count = card.length;

  return {
    message: `Get card by limit: ${limit}, page: ${page} successfully!`,
    count,
    limit,
    page,
    data: card,
  };
};

const updateCard = async (cardId, card) => {
  try {
    const existingCard = await Card.findById(cardId);
    if (!existingCard) return { status: false, message: "Card doesn't exist!" };

    Object.assign(existingCard, card);

    const updatedCard = await existingCard.save();
    return {
      status: true,
      message: "Card updated successfully",
      data: updatedCard,
    };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

module.exports = {
  createCard,
  deleteCard,
  getCardById,
  getCardList,
  updateCard,
};
