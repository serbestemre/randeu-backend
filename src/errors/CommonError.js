const CommonError = {};

CommonError.businessError = () => ({
  statusCode: 500,
  message: "Internal Error"
});

CommonError.validationError = (data) => ({
  statusCode: 400,
  message: "Validation Error",
  data
});

module.exports = CommonError;