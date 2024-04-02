const Joi = require("joi");
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

const schemas = {
  idSchema: Joi.object().keys({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),

  userSchema: Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(32).required(),
    name: Joi.string().trim().required(),
  }),

  // dung cho truong hop update, request update chi co vai properties
  userOptionalSchema: Joi.object().keys({
    email: Joi.string().email().lowercase(),
    password: Joi.string().min(4).max(32),
    name: Joi.string().trim().required(),
  }),
};

module.exports = {
  userValidate,
  schemas,
};
