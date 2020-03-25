const User = require("../models/User");

exports.insertManyUsersDB = async users => User.insertMany(users);

exports.findUserByEmailDB = async email => User.findOne({ email });

exports.findUserByIdDB = async userId => User.findById(userId);

exports.updateUserRolesDB = async (_id, roles) =>
  User.updateOne({ _id }, { $set: { roles } });

exports.deleteManyUsersDB = async () => User.deleteMany();
