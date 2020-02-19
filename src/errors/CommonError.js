const CommonError = {};

CommonError.serverError = () => ({
  statusCode: 500,
  message: "Internal Server Error"
});

CommonError.validationError = data => ({
  statusCode: 400,
  message: "Validation Error",
  data
});

module.exports = CommonError;
