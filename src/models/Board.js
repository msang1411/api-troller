const { model, Schema, Types } = require("mongoose");

var schema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
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
    isDone: {
      type: Boolean,
      default: false,
    },
    doneAt: {
      type: Date,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    deleteAt: {
      type: Date,
    },
    member: [{ type: String, ref: "user" }],
  },
  {
    collection: "board",
  }
);

schema.pre("save", function (next) {
  // Update updateAt field to current timestamp
  if (!this.isNew) {
    this.updateAt = new Date();
  }
  next();
});

const Board = model("board", schema);
module.exports = Board;
