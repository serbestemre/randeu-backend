const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserDataAccessLayer = require("../../src/dataAccess/User");
const User = require("../../src/models/User");

const signToken = user =>
  jwt.sign(
    {
      iss: "Randeu",
      sub: user.id,
      iat: new Date().getTime(), // current time
      roles: user.roles,
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    process.env.JWT_SECRET_KEY
  );

// End-user role
const userOneId = new mongoose.Types.ObjectId();
const userOne = new User({
  method: "local",
  _id: userOneId,
  fullName: "UserOne",
  email: "userOne@gmail.com",
  password: "123456",
  roles: [1]
});
const userOneToken = signToken(userOne);

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = new User({
  method: "local",
  _id: userTwoId,
  fullName: "UserTwo",
  email: "userTwo@gmail.com",
  password: "123456",
  roles: [1]
});
const userTwoToken = signToken(userTwo);

const employeeOneKuaforId = new mongoose.Types.ObjectId();
const employeeOneKuafor = new User({
  method: "local",
  _id: employeeOneKuaforId,
  fullName: "employeeOne Kuaför",
  email: "employeeOneKuafor@gmail.com",
  password: "123456",
  roles: [1, 2]
});
const employeeOneKuaforToken = signToken(employeeOneKuafor);

const employeeTwoDisHekimiId = new mongoose.Types.ObjectId();
const employeeTwoDisHekimi = new User({
  method: "local",
  _id: employeeTwoDisHekimiId,
  fullName: "employeeTwo Dis Hekimi",
  email: "employeeTwoDisHekimi@gmail.com",
  password: "123456",
  roles: [1, 2]
});
const employeeTwoDisHekimiToken = signToken(employeeTwoDisHekimi);

const businessOwnerKuaforId = new mongoose.Types.ObjectId();
const businessOwnerKuafor = new User({
  method: "local",
  _id: businessOwnerKuaforId,
  fullName: "businessOwner Kuaför",
  email: "businessOwnerKuafore@gmail.com",
  password: "123456",
  roles: [1, 2, 3]
});
const businessOwnerKuaforToken = signToken(businessOwnerKuafor);

const businessOwnerDisHekimiId = new mongoose.Types.ObjectId();
const businessOwnerDisHekimi = new User({
  method: "local",
  _id: businessOwnerDisHekimiId,
  fullName: "businessOwner Diş Hekimi",
  email: "businessOwnerDisHekimi@gmail.com",
  password: "123456",
  roles: [1, 2, 3]
});
const businessOwnerDisHekimiToken = signToken(businessOwnerDisHekimi);

const adminId = new mongoose.Types.ObjectId();
const admin = new User({
  method: "local",
  _id: adminId,
  fullName: "Admin",
  email: "admin@randeu.com",
  password: "123456",
  roles: [1, 4]
});
const adminToken = signToken(admin);

const setupUserDB = async () => {
  await UserDataAccessLayer.deleteManyUsersDB();
  await UserDataAccessLayer.insertManyUsersDB(
    [userOne,
      userTwo,
      employeeOneKuafor,
      employeeTwoDisHekimi,
      businessOwnerKuafor,
      businessOwnerDisHekimi,
      admin]
  );
};

module.exports = {
  userOne,
  userOneToken,
  userTwo,
  userTwoToken,
  employeeOne: employeeOneKuafor,
  employeeOneToken: employeeOneKuaforToken,
  employeeTwo: employeeTwoDisHekimi,
  employeeTwoToken: employeeTwoDisHekimiToken,
  businessOwnerKuafor,
  businessOwnerOneToken: businessOwnerKuaforToken,
  businessOwnerTwo: businessOwnerDisHekimi,
  businessOwnerTwoToken: businessOwnerDisHekimiToken,
  admin,
  adminToken,
  setupUserDB
};
