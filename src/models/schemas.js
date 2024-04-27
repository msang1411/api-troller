const Joi = require("joi");

const boardSchema = Joi.object().keys({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  name: Joi.string().trim().required(),
  description: Joi.string(),
  updateAt: Joi.date().iso().less("now"),
  idDone: Joi.boolean().default(false),
  doneAt: Joi.date().iso().less("now"),
  isDelete: Joi.boolean().default(false),
  deleteAt: Joi.date().iso().less("now"),
  member: Joi.array(),
});

const idSchema = Joi.object().keys({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const userSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).max(32).required(),
  name: Joi.string().trim().required(),
});

// dung cho truong hop update, request update chi co vai properties
const userOptionalSchema = Joi.object().keys({
  email: Joi.string().email().lowercase(),
  password: Joi.string().min(4).max(32),
  name: Joi.string().trim(),
});

module.exports = {
  boardSchema,
  idSchema,
  userSchema,
  userOptionalSchema,
};
