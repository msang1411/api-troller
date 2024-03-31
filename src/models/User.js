const { model, Schema } = require("mongoose");
// const bcrypt = require("bcryptjs");
// const ApiError = require("../utils/ApiError");

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
// encrypt password
// need fix pre("save")
// schema.pre("save", async function (next) {
//   try {
//     // Generate a salt
//     const salt = await bcrypt.genSalt(10);
//     // Generate a password hash (salt + hash)
//     const passwordHash = await bcrypt.hash(this.password, salt);
//     // Re-assign password hashed
//     this.password = passwordHash;

//     next();
//   } catch (error) {
//     next(new ApiError(400, error));
//   }
// });

// schema.methods.isValidPassword = async function (accountPassword) {
//   try {
//     return await bcrypt.compare(accountPassword, this.password);
//   } catch (error) {
//     throw new ApiError(400, error.message);
//   }
// };

const User = model("user", schema);
module.exports = User;
