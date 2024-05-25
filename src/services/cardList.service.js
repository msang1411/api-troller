const ApiError = require("../utils/ApiError");
const CardList = require("../models/CardList");
const Card = require("../models/Card");

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
    .sort({ position: 1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const count = cardListList.length;

  return {
    message: `Get card list by limit: ${limit}, page: ${page} successfully!`,
    count,
    limit,
    page,
    data: cardListList,
  };
};

const getCardListWithCard = async (filters) => {
  try {
    const listCardList = await CardList.find(filters)
      .sort({ position: 1 })
      .lean();
    const count = listCardList.length;

    let data = [];
    for (const cardList of listCardList) {
      const listCard = await Card.find({
        cardListId: cardList._id,
        isDelete: false,
      });

      cardList.cards = listCard;
      data.push(cardList);
    }

    return { count, data, message: "Get card list successfully!" };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
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

const updateManyCardList = async (listCardList) => {
  try {
    if (!Array.isArray(listCardList)) {
      throw new ApiError(400, "Input should be an array of card lists");
    }

    const updatePromises = listCardList.map((card) => {
      const { _id, ...updateData } = card;
      if (!_id) {
        throw new ApiError(400, "Each card list must have an _id");
      }
      updateData.updateAt = new Date();

      return CardList.findByIdAndUpdate(_id, updateData, { new: true });
    });

    const updatedCardLists = await Promise.all(updatePromises);
    updatedCardLists.sort((a, b) => a.position - b.position);

    return {
      status: true,
      message: "Card lists updated successfully",
      data: updatedCardLists,
    };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const updatePositionCardList = async (id, newPosition) => {
  try {
    const cardListUpdate = await CardList.findById(id);
    if (!cardListUpdate)
      return { status: false, message: "CardList doesn't exist!" };

    const oldPosition = cardListUpdate.position;

    if (newPosition < oldPosition) {
      const listCardListBehind = await CardList.find({
        position: { $gte: newPosition, $lt: oldPosition },
      }).sort({ position: 1 });

      listCardListBehind.forEach(async (cardList) => {
        cardList.position += 1;
        await cardList.save();
      });
    } else if (newPosition > oldPosition) {
      const listCardListBehind = await CardList.find({
        position: { $gt: oldPosition, $lte: newPosition },
      }).sort({ position: 1 });

      listCardListBehind.forEach(async (cardList) => {
        cardList.position -= 1;
        await cardList.save();
      });
    } else {
      return { status: false, message: "The new and old positions are equal!" };
    }

    cardListUpdate.position = newPosition;
    await cardListUpdate.save();
    const data = await CardList.find({}).sort({ position: 1 });
    return { status: true, message: "Update position success!", data };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

module.exports = {
  createCardList,
  deleteCardList,
  getCardListById,
  getCardListList,
  getCardListWithCard,
  updateCardList,
  updateManyCardList,
  updatePositionCardList,
};
