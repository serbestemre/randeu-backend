const response = require("../helpers/Response");
const commonError = require("../errors/CommonError");


function validateBodyScheme(schema) {
  return async function(req, res, next) {
    try {
      const value = await schema.validateAsync(req.body);
      next();
    } catch (err) {
      return response.withError(res, commonError.validationError(err));
    }
  };
}

module.exports = validateBodyScheme;
