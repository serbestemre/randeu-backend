const User = require('../models/User');

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
    const token = await newUser.generateAuthToken();
    res.status(201).send({ newUser, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
};
