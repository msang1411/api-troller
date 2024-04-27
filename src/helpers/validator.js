const ApiError = require("../utils/ApiError");

const userValidate = (schema) => {
  let result;
  return (req, res, next) => {
    if (req.body.user != null) {
      result = schema.validate(req.body.user);
    } else {
      result = schema.validate(req.body);
    }

    if (result.error) next(new ApiError(400, result.error));
    else {
      if (!req.value) req.value = {};
      if (!req.value["params"]) req.value.params = {};
      req.value.body = result.value;
      next();
    }
  };
};

const dataValidate = (schema) => {
  return (req, res, next) => {
    if (!req.body || !req.body.data) next(new ApiError(400, "Invalid request"));

    const result = schema.validate(req.body.data);
    if (result.error) next(new ApiError(400, result.error));
    else {
      if (!req.value) req.value = {};
      if (!req.value["params"]) req.value.params = {};
      req.value.body = result.value;
      next();
    }
  };
};

const paramsValidate = (schema) => {
  return (req, res, next) => {
    if (!req.params) return next(new ApiError(400, "Params are undefined"));

    const result = schema.validate(req.params);
    if (result.error) {
      const errorMessage = result.error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new ApiError(400, errorMessage));
    } else {
      req.value.params = result.value;
      next();
    }
  };
};

// const schemas = {
//   idSchema: Joi.object().keys({
//     id: Joi.string()
//       .regex(/^[0-9a-fA-F]{24}$/)
//       .required(),
//   }),

//   userSchema: Joi.object().keys({
//     email: Joi.string().email().lowercase().required(),
//     password: Joi.string().min(4).max(32).required(),
//     name: Joi.string().trim().required(),
//   }),

//   // dung cho truong hop update, request update chi co vai properties
//   userOptionalSchema: Joi.object().keys({
//     email: Joi.string().email().lowercase(),
//     password: Joi.string().min(4).max(32),
//     name: Joi.string().trim(),
//   }),
// };

module.exports = {
  dataValidate,
  paramsValidate,
  userValidate,
};
