const CommonError = {};

CommonError.businessError = () => ({
  statusCode: 500,
  message: "Internal Error"
});

module.exports = CommonError;