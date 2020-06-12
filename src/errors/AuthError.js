const AuthError = {};
const CustomError = require("../helpers/CustomError");

AuthError.UserAlreadyExists = () =>
  new CustomError(400, "Bu mail adresi ile zaten daha önce kayıt olunmuş");

AuthError.UserNotFound = () => new CustomError(404, "Kullanıcı bulunamadı");

AuthError.WrongPasswordorEmail = () =>
  new CustomError(400, "Hatalı email adresi veya şifre");

AuthError.UserAccountIsAlreadyActivated = () =>
  new CustomError(400, "Bu kullanıcı daha önce zaten aktif edilmiş");

AuthError.ActivationLinkExpired = () =>
  new CustomError(400, "Bu link artık geçerli değil");
AuthError.PasswordsNotMatch = () =>
  new CustomError(400, "Girilen parolalar uyuşmuyor");

AuthError.UserNotActive = () =>
  new CustomError(400, "Kullanıcı hesabı henüz aktif edilmedi");

module.exports = AuthError;
