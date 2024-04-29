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

const filtersValidate = (schema) => {
  return (req, res, next) => {
    if (!req.body.filters)
      return next(new ApiError(400, "Filters are undefined"));

    const result = schema.validate(req.body.filters);
    if (result.error) {
      const errorMessage = result.error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new ApiError(400, errorMessage));
    } else {
      if (!req.value) req.value = {};
      req.value.filters = result.value;
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
      if (!req.value) req.value = {};
      req.value.params = result.value;
      next();
    }
  };
};

const queryValidate = (schema) => {
  return (req, res, next) => {
    if (!req.query)
      return next(new ApiError(400, "Query params are undefined"));

    const result = schema.validate(req.query);
    if (result.error) {
      const errorMessage = result.error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new ApiError(400, errorMessage));
    } else {
      if (!req.value) req.value = {};
      req.value.query = result.value;
      next();
    }
  };
};

module.exports = {
  filtersValidate,
  dataValidate,
  paramsValidate,
  queryValidate,
  userValidate,
};
