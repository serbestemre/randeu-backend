const UserError = {};
const CustomError = require("../helpers/CustomError");

UserError.UserNotFound = () => new CustomError(404,
  "Kullanıcı bulunamadı");

UserError.UserNotActivated = () => new CustomError(404,
  "Kullanıcı hesabı aktif değil");

module.exports = UserError;
