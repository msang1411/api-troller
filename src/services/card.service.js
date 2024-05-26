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
    .sort({ position: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
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
const updateManyCards = async (cards) => {
  try {
    if (!Array.isArray(cards)) {
      throw new ApiError(400, "Input should be an array of cards");
    }

    const updatePromises = cards.map((card) => {
      const { _id, ...updateData } = card;
      if (!_id) {
        throw new ApiError(400, "Each card must have an _id");
      }
      updateData.updateAt = new Date();

      return Card.findByIdAndUpdate(_id, updateData, { new: true });
    });

    const updatedCards = await Promise.all(updatePromises);
    updatedCards.sort((a, b) => a.position - b.position);

    return {
      status: true,
      message: "Cards updated successfully",
      data: updatedCards,
    };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const updatePositionCard = async ({ id, newCardListId, newPosition }) => {
  try {
    const cardUpdate = await Card.findById(id);
    if (!cardUpdate) return { status: false, message: "Card doesn't exist!" };

    let updatePosition = newPosition;

    if (cardUpdate.cardListId.toString() === newCardListId) {
      const oldPosition = cardUpdate.position;

      if (newPosition < oldPosition) {
        const cardsBehind = await Card.find({
          position: { $gte: newPosition, $lt: oldPosition },
        }).sort({ position: 1 });

        cardsBehind.forEach(async (card) => {
          card.position = updatePosition + 1;
          updatePosition += 1;
          await card.save();
        });
      } else if (newPosition > oldPosition) {
        const cardsBehind = await Card.find({
          position: { $gt: oldPosition, $lte: newPosition },
        }).sort({ position: -1 });

        cardsBehind.forEach(async (card) => {
          card.position = updatePosition - 1;
          updatePosition -= 1;
          await card.save();
        });
      } else {
        return {
          status: false,
          message: "The new and old positions are equal!",
        };
      }
    } else {
      cardUpdate.cardListId = newCardListId;

      const cardsBehind = await Card.find({
        cardListId: newCardListId,
        position: { $gte: newPosition },
      }).sort({ position: 1 });

      cardsBehind.forEach(async (card) => {
        card.position += 1;
        await card.save();
      });
    }

    cardUpdate.position = newPosition;
    await cardUpdate.save();
    const data = await Card.find({ cardListId: newCardListId }).sort({
      position: 1,
    });
    return { status: true, message: "Update position success!", data };
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
  updateManyCards,
  updatePositionCard,
};
