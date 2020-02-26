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

CommonError.notAuthenticated = data => ({
  statusCode: 401,
  message: "Lütfen sisteme giriş yapın",
  data
});

CommonError.notAuthorized = data => ({
  statusCode: 403,
  message: "Bu işlemi yapmak için yetkiniz yok!",
  data
});

module.exports = CommonError;
