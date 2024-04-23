const authService = require("../services/auth.service");

const checkTokenExpired = async (req, res, next) => {
  try {
    const isTokenExpired = await authService.checkTokenExpired(
      req.headers.authorization
    );

    return res.status(200).json({
      statusCode: 200,
      isTokenExpired,
      message: isTokenExpired
        ? "Token has expired!"
        : "Token have not expired!",
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      throw new ApiError(500, `request don't have refreshToken`);
    const token = await authService.refreshToken(refreshToken);
    return res.status(200).json({
      statusCode: 200,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const result = await authService.signIn(req.value.body);
    if (result.status) {
      res.setHeader("Authorization", result.token);

      return res.status(200).json({
        statusCode: 200,
        message: "account has been sign in",
        token: result.token,
        refreshToken: result.refreshToken,
        user: result.data,
      });
    } else
      return res.status(403).json({
        statusCode: 403,
        message: "that account already not exists !",
      });
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
  checkTokenExpired,
  refreshToken,
  signIn,
  signUp,
};
