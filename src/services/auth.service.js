const ApiError = require("../utils/ApiError");
const User = require("../models/User");
const bcrypt = require("../helpers/bcrypt");
const auth = require("../authentication/authentication");

const checkTokenExpired = async (token) => {
  try {
    const isTokenExpired = await auth.isAccessTokenExpired(token);
    return isTokenExpired;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

const refreshToken = async (refreshToken) => {
  try {
    if (!refreshToken)
      throw new ApiError(500, `request don't have refreshToken`);
    const { sub } = await auth.verifyRefreshToken(refreshToken);
    const newAccessToken = auth.signAccessToken(sub);
    const newRefreshToken = auth.signRefreshToken(sub);
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const signIn = async (user) => {
  try {
    const account = await User.findOne({
      email: user.email,
    });

    if (account == null)
      return {
        status: false,
        message: "account not already exist!",
      };

    const isValid = await bcrypt.compareHash(user.password, account.password);
    if (!isValid) throw new ApiError(500, "wrong password");

    // encode token
    const accessToken = auth.signAccessToken(account._id);
    const refreshToken = auth.signRefreshToken(account._id);

    return {
      status: true,
      data: account,
      accessToken,
      refreshToken,
      message: "sign in!",
    };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

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
        accessToken,
        refreshToken,
      };
    }
  } catch (err) {
    throw new ApiError(500, err);
  }
};

module.exports = {
  checkTokenExpired,
  refreshToken,
  signIn,
  signUp,
};
