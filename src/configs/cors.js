const { WHITELIST_DOMAINS } = require("../utils/constants");
require("dotenv").config();
const ApiError = require("../utils/ApiError.js");

const corsOptions = {
  origin: function (origin, callback) {
    console.log("wtf: ", origin);
    // allow postman (postman's origin = undefined) if environment = dev
    if (!origin && process.env.BUILD_MODE === "dev") {
      return callback(null, true);
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(
      new ApiError(403, `${origin} not allowed by our CORS Policy.`)
    );
  },

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS allow get cookies from request
  credentials: true,
};

module.exports = corsOptions;
