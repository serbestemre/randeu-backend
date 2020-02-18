const Joi = require("@hapi/joi");

const commonError = require("../errors/CommonError");
const response = require("../helpers/response");
const { ENDPOINTS } = require("../constants");

module.exports = async function validate(req, res, next) {
  const schema = ENDPOINTS[req.originalUrl.slice(1)];

  try {
    const value = await schema.validateAsync(req.body);
    console.log(value);
    next();
  } catch (err) {
    console.log("Register Validator Error: ", err);
    return response.withError(res, commonError.validationError(err));
  }
};
