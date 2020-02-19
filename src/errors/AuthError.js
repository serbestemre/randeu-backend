const AuthError = {};
AuthError.userAlreadyExists = () => ({
  statusCode: 403,
  message: "Kullanıcı zaten kayıtlı"
});

module.exports = AuthError;
