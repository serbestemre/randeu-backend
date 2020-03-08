const AuthError = {};
AuthError.userAlreadyExists = () => ({
  statusCode: 403,
  message: "Kullanıcı zaten kayıtlı!"
});

AuthError.UserNotFound = () => ({
  statusCode: 404,
  message: "Kullanıcı bulunamadı!"
});

module.exports = AuthError;
