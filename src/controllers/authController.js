const ValidationError = require("mongoose").Error.ValidationError;
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const response = require('../helpers/response');
const AuthError = require('../errors/AuthError');
const CommonError = require('../errors/CommonError');

const signToken = user => {
  return JWT.sign(
    {
      iss: 'PAA',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    process.env.JWT_SECRET_KEY
  );
};

exports.register = async (req, res) => {
  try {
    const { email } = req.body;

    // check if there any user with the same email
    const foundLocalUser = await User.findOne({ 'local.email': email });
    const foundGoogleUser = await User.findOne({
      'google.email': email
    });

    if (foundLocalUser || foundGoogleUser) return response.withError(res, AuthError.userAlreadyExists());

    const newUser = new User({
      method: 'local',
      local: req.body
    });

    await newUser.save();
    const token = await signToken(newUser);

    return response.success(res, 201, { newUser, token });
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, {statusCode: 400});
      return response.withError(res, error);
    }
    return response.withError(res, CommonError.businessError());
  }
};

exports.login = async (req, res) => {
  const token = signToken(req.user);
  res.status(200).json({ token });
};

exports.googleOAuth = async (req, res) => {
  // Generate token
  console.log('req.user', req.user);
  const email = req.user.google.email;
  const token = signToken(req.user);
  res.status(200).json({ token, email });
};

exports.facebookOAuth = async () => {
  // Generate token
  console.log('Facebook auth!');
};

exports.secret = async (req, res) => {
  console.log('Token accepted');
  res.json({ secret: 'resource' });
};
