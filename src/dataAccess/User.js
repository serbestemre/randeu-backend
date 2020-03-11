const User = require("../models/User");

exports.findUserByIdDB = async userId => User.findById(userId);

exports.updateUserRoles = async (_id, roles) =>
  User.updateOne({ _id }, { $set: { roles } });
