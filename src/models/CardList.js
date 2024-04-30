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

schema.pre("save", function (next) {
  // Update updateAt field to current timestamp
  if (!this.isNew) {
    if (this.isModified("isDelete") && this.isDelete) next();
    else this.updateAt = new Date();
  }
  next();
});

const CardList = model("cardList", schema);
module.exports = CardList;
