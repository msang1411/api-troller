const authService = require("../services/auth.service");

const signIn = async (req, res, next) => {
  try {
    const result = await authService.signIn(req.value.body);
    if (result.status) {
      res.setHeader("Authorization", result.token);

      return res.status(200).json({
        status: 200,
        message: "account has been sign in",
        token: result.token,
        refreshToken: result.refreshToken,
      });
    } else
      return res
        .status(403)
        .json({ status: 403, message: "that account already not exists !" });
  } catch (error) {
    next(error);
  }
};

const signUp = async (req, res, next) => {
  try {
    const result = await authService.signUp(req.value.body);

    if (result.status === false)
      return res.status(400).json({
        status: 400,
        message: "email has been exist",
      });

    return res.status(200).json({
      status: 200,
      data: {
        data: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
      message: "Successfully User return",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signIn,
  signUp,
};