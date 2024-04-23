const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../configs/index");
const JWT = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const signAccessToken = (userId) => {
  try {
    return JWT.sign(
      {
        sub: userId,
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1 days",
      }
    );
  } catch (error) {
    throw new ApiError(402, error.message);
  }
};

// refresh token
const signRefreshToken = (userId) => {
  try {
    return JWT.sign(
      {
        sub: userId,
      },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30 days",
      }
    );
  } catch (error) {
    throw new ApiError(402, error.message);
  }
};

// verify token
const verifyAccessToken = (req, res, next) => {
  if (!req.headers.authorization)
    return next(new ApiError(401, "Unauthorized"));
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];

  // start verify token
  JWT.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "JsonWebTokenError")
        return next(new ApiError(401, "Unauthorized"));
      // Error token expired
      return next(new ApiError(402, err.message));
    }
    req.payload = payload;
    next();
  });
};

const isAccessTokenExpired = async (bearerToken) => {
  const token = bearerToken.split(" ")[1];
  return await new Promise((resolve, reject) => {
    JWT.verify(token, ACCESS_TOKEN_SECRET, (err) => {
      if (err) {
        // Another error
        if (err.name === "JsonWebTokenError") {
          reject(new ApiError(400, err.message));
        }
        // Error token expired
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          reject(new ApiError(401, "Unauthorized"));
        } else {
          reject(new ApiError(402, err.message));
        }
      } else {
        resolve(payload);
      }
    });
  });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  isAccessTokenExpired,
  verifyRefreshToken,
};
