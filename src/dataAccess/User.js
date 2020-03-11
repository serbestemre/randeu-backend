const User = require("../models/User");

exports.findUserByEmailDB = async email => User.findOne({ email });

exports.updateUserRoles = async (_id, roles) =>
  User.updateOne({ _id }, { $set: { roles } });
