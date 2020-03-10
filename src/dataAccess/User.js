const User = require("../models/User");

exports.findUserById = async userId => User.findById(userId);

exports.updateUserRoles = async (_id, roles) =>
  User.updateOne({ _id }, { $set: { roles } });
