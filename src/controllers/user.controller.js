const userService = require("../services/user.service");

const sample = async (req, res, next) => {
  try {
    await userService.sample();
    return res.status(200).json({
      status: 200,
      data: { data: "data" },
      message: "Successfully User return",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sample,
};
