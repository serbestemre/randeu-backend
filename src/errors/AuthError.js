const AuthError = {};
AuthError.userAlreadyExists = () => ({
  statusCode: 403,
  message: "Kullanıcı zaten kayıtlı"
});

module.exports = AuthError;
AuthError.zatenVar = () => {
  const error = new Error("Kullanıcı zaten var");
  error.statusCode = 403;
  throw error;
};
