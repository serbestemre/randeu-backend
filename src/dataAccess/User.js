const User = require("../models/User");

exports.findUserByEmailDB = async email => User.findOne({ email });

exports.findUserByIdDB = async userId => User.findById(userId);


exports.updateUserRolesDB = async (_id, roles) =>
  User.updateOne({ _id }, { $set: { roles } });
