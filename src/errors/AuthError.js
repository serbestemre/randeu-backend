exports.userAlreadyExists = () => {
  const error = new Error();
  error.message = "Kullanıcı zaten kayıtlı";
  error.statusCode = 403;
  throw error;
};
