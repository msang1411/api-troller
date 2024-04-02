const ApiError = require("../utils/ApiError");
const User = require("../models/User");
const bcrypt = require("../helpers/bcrypt");
const auth = require("../authentication/authentication");

const signUp = async (user) => {
  try {
    const checkUser = await User.findOne({ email: user.email });
    if (checkUser) return { status: false };
    else {
      const passwordHashed = await bcrypt.bcryptHash(user.password);
      user.password = passwordHashed;
      // validator
      user.createAt = Date.now();

      let newUser = new User(user);
      await newUser.save();

      const accessToken = auth.signAccessToken(newUser._id);
      const refreshToken = auth.signRefreshToken(newUser._id);

      return {
        status: true,
        user,
        accessToken,
        refreshToken,
      };
    }
  } catch (err) {
    throw new ApiError(500, err);
  }
};

module.exports = {
  signUp,
};
