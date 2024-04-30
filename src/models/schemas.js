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

const boardFiltersSchema = Joi.object().keys({
  userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: Joi.string().trim(),
  description: Joi.string(),
  updateAt: Joi.date().iso(),
  idDone: Joi.boolean(),
  doneAt: Joi.date().iso(),
  isDelete: Joi.boolean().default(false),
  deleteAt: Joi.date().iso(),
  member: Joi.array(),
});

const boardUpdateSchema = Joi.object().keys({
  userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: Joi.string().trim(),
  description: Joi.string(),
  idDone: Joi.boolean(),
  doneAt: Joi.date().iso(),
  isDelete: Joi.boolean(),
  deleteAt: Joi.date().iso(),
  member: Joi.array(),
});

const cardListSchema = Joi.object().keys({
  boardList: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  name: Joi.string().trim().required(),
  isDelete: Joi.boolean().default(false),
});

const cardListFiltersSchema = Joi.object().keys({
  boardList: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: Joi.string().trim(),
  updateAt: Joi.date().iso(),
  isDelete: Joi.boolean().default(false),
  deleteAt: Joi.date().iso(),
});

const cardListUpdateSchema = Joi.object().keys({
  boardList: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: Joi.string().trim(),
  updateAt: Joi.date().iso(),
  isDelete: Joi.boolean(),
  deleteAt: Joi.date().iso(),
});

const idSchema = Joi.object().keys({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const paginationSchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(10),
  page: Joi.number().integer().min(1).default(1),
});

const userSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).max(32).required(),
  name: Joi.string().trim().required(),
});

// update user
const userOptionalSchema = Joi.object().keys({
  email: Joi.string().email().lowercase(),
  password: Joi.string().min(4).max(32),
  name: Joi.string().trim(),
});

module.exports = {
  boardSchema,
  boardFiltersSchema,
  boardUpdateSchema,
  cardListSchema,
  cardListFiltersSchema,
  cardListUpdateSchema,
  idSchema,
  paginationSchema,
  userSchema,
  userOptionalSchema,
};
