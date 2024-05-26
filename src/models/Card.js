const { model, Schema, Types } = require("mongoose");

var schema = new Schema(
  {
    cardListId: {
      type: Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
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
    collection: "card",
  }
);

schema.pre("save", async function (next) {
  if (!this.isNew) {
    if (this.isModified("isDelete") && this.isDelete) next();
    else this.updateAt = new Date();
  } else {
    try {
      const maxPosition = await this.constructor
        .findOne({ cardListId: this.cardListId }, { position: 1 })
        .sort({ position: -1 })
        .limit(1);
      if (!maxPosition || !maxPosition.position) {
        this.position = 0;
      } else {
        this.position = maxPosition.position + 1;
      }
      next();
    } catch (error) {
      next(error);
    }
  }
  next();
});

const Card = model("card", schema);
module.exports = Card;
