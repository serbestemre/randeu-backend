const User = require("../models/User");

exports.insertOneUserDB = async (method, fullName, roles, email, password) =>
  User.create({
    method, fullName, roles, email, password
  });


exports.insertAppointmentUserProfileDB = async (
  _id, appointment
) =>
  User.updateOne({ _id }, { $push: { appointments: appointment } });


exports.insertManyUsersDB = async users => User.insertMany(users);

exports.findUserByEmailDB = async email => User.findOne({ email });

exports.findUserByIdDB = async userId => User.findById(userId);

exports.updateUserRolesDB = async (_id, roles) =>
  User.updateOne({ _id }, { $set: { roles } });

exports.deleteManyUsersDB = async () => User.deleteMany();

exports.activateUserProfileDB = async _id => User.updateOne({ _id }, { $set: { isActive: true } });
