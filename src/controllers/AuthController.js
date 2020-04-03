const JWT = require("jsonwebtoken");

const AuthSuccess = require("../successes/AuthSuccess");
const AuthService = require("../services/AuthService");
const CustomError = require("../helpers/CustomError");
const CommonError = require("../errors/CommonError");
const Response = require("../helpers/Response");

const signToken = user =>
  JWT.sign(
    {
      iss: "Randeu",
      sub: user.id,
      iat: new Date().getTime(), // current time
      roles: user.roles,
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    process.env.JWT_SECRET_KEY
  );

exports.register = async (req, res) => {
  try {
    const {
      fullName, email, password, passwordCheck
    } = req.body;

    const user = await AuthService.registerService(
      fullName.trim(), email.trim(), password.trim(), passwordCheck.trim()
    );

    return Response.success(res, AuthSuccess.UserRegistered(), user);
  } catch (error) {
    if (error instanceof CustomError) return Response.withError(res, error);
    console.log(error);
    return Response.withError(res, CommonError.serverError(error));
  }
};

exports.reSendActivationLink = async (req, res) => {
  const { email } = req.body;
  try {
    await AuthService.reSendActivationLinkService(email);

    Response.success(res, AuthSuccess.ActivationMailSent(email));
  } catch (error) {
    if (error instanceof CustomError) return Response.withError(res, error);
    Response.withError(res, CommonError.serverError());
    console.log(error);
  }
};

exports.activateUserAccount = async (req, res) => {
  const { uuid } = req.params;
  try {
    await AuthService.activateUserAccountService(uuid);
    Response.success(res, AuthSuccess.UserProfileActivated());
  } catch (error) {
    if (error instanceof CustomError) return Response.withError(res, error);
    console.log(error);
    return Response.withError(res, CommonError.serverError());
  }
};


exports.login = async (req, res) => {
  // TODO Check user.isActivate ?
  const token = signToken(req.user);
  Response.success(res, 200, { token }, "User logged in successfully.");
};

exports.googleOAuth = async (req, res) => {
  try {
    console.log("Authenticated user via Google: ", req.user);
    const email = req.user.email;
    const token = signToken(req.user);
    Response.success(
      res,
      200,
      { token, email },
      "Kullanıcı Google hesabı ile başarılı bir şekilde sisteme kayıt oldu."
    );
  } catch (error) {
    console.log(error);
  }
};

exports.facebookOAuth = async (req, res) => {
  console.log("Authenticated user via Facebook: ", req.user);
  const token = signToken(req.user);

  Response.success(
    res,
    200,
    { token },
    "User authenticated via Facebook account successfully."
  );
};

exports.secret = async (req, res) => {
  console.log("Token accepted");
  res.json({ secret: "resource" });
};
