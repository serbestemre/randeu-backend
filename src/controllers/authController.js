const JWT = require('jsonwebtoken');
const User = require('../models/User');

signToken = user => {
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
    const { email, password } = req.body;

    // check if there any user with the same email
    const foundUser = await User.findOne({ 'local.email': email });
    if (foundUser)
      return res.status(403).json({ error: 'Email is already in use' });

    const newUser = new User({
      method: 'local',
      local: req.body
    });

    await newUser.save();
    const token = await signToken(newUser);

    res.status(201).send({ newUser, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res, next) => {
  const token = signToken(req.user);
  res.status(200).json({ token });
};

exports.googleOAuth = async (req, res, next) => {
  // Generate token
  console.log('req.user', req.user);
  const token = signToken(req.user);
  res.status(200).json({ token });
};

exports.facebookOAuth = async (req, res, next) => {
  // Generate token
  console.log('GOT HERE!');
};

exports.secret = async (req, res, next) => {
  console.log('I managed to get here!');
  res.json({ secret: 'resource' });
};
