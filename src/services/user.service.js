const ApiError = require("../utils/ApiError");
const User = require("../models/User");

const sample = async () => {
  try {
    const user = await User.find({});
    return user;
  } catch (err) {
    throw new ApiError(500, err);
  }
};

module.exports = {
  sample,
};
