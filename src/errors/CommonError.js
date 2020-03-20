const CommonError = {};

CommonError.serverError = error => ({
  statusCode: 500,
  message: "Internal Server Error",
  errorMessage: error ? error.message : ""
});

CommonError.validationError = data => ({
  statusCode: 422,
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
