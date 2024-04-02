const { model, Schema } = require("mongoose");

var schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
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
    roles: [{ type: String, ref: "role" }],
  },
  {
    collection: "user",
  }
);

const User = model("user", schema);
module.exports = User;
