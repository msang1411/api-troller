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

schema.pre("save", function (next) {
  if (!this.isNew) {
    if (this.isModified("isDelete") && this.isDelete) next();
    else this.updateAt = new Date();
  }
  next();
});

const Card = model("card", schema);
module.exports = Card;
