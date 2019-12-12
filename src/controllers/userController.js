const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.viewProfile = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteMyAccount = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();
    res.send('logout is done successfully');
  } catch (error) {
    res.status(500).send();
  }
};
