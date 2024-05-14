const { model, Schema, Types } = require("mongoose");

var schema = new Schema(
  {
    boardId: {
      type: Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: Number,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    deleteAt: {
      type: Date,
    },
  },
  {
    collection: "cardList",
  }
);

schema.pre("save", async function (next) {
  // Update updateAt field to current timestamp
  if (!this.isNew) {
    if (this.isModified("isDelete") && this.isDelete) next();
    else this.updateAt = new Date();
  } else {
    try {
      const maxPosition = await this.constructor
        .findOne({}, { position: 1 })
        .sort({ position: -1 })
        .limit(1);
      if (!maxPosition || !maxPosition.position) {
        this.position = 1;
      } else {
        this.position = maxPosition.position + 1;
      }
      next();
    } catch (error) {
      next(error);
    }
  }
});

const CardList = model("cardList", schema);
module.exports = CardList;
