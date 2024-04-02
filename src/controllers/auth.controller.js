const authService = require("../services/auth.service");

const signUp = async (req, res, next) => {
  try {
    const result = await authService.signUp(req.body.user);

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
  signUp,
};
