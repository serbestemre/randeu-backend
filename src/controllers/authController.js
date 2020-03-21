const ValidationError = require("mongoose").Error.ValidationError;
const JWT = require("jsonwebtoken");

const UserDataAccess = require("../dataAccess/User");
const CommonError = require("../errors/CommonError");
const AuthError = require("../errors/AuthError");
const response = require("../helpers/response");
const User = require("../models/User");

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
    const { email } = req.body;
    // TODO check password and passwordCheck inputs equalities.
    // check if there any user with the same email
    const foundUser = await UserDataAccess.findUserByEmailDB(email);

    if (foundUser)
      return response.withError(res, AuthError.userAlreadyExists());

    const newUser = new User({
      method: "local",
      roles: [1],
      ...req.body
    });

    await newUser.save();
    const token = signToken(newUser);

    return response.success(res, 201, { newUser, token });
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return response.withError(res, error);
    }
    console.log(error);
    return response.withError(res, CommonError.serverError(error));
  }
};

exports.login = async (req, res) => {
  const token = signToken(req.user);
  response.success(res, 200, { token }, "User logged in successfully.");
};

exports.googleOAuth = async (req, res) => {
  console.log("Authenticated user via Google: ", req.user);
  const email = req.user.email;
  const token = signToken(req.user);
  response.success(
    res,
    200,
    { token, email },
    "User authenticated via Google account successfully."
  );
};

exports.facebookOAuth = async (req, res) => {
  console.log("facebookouath.controller!!!");
  const token = signToken(req.user);

  response.success(
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
