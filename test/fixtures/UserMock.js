const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const SectorDataAccessLayer = require("../../src/dataAccess/Sector");
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

const employeeOneId = new mongoose.Types.ObjectId();
const employeeOne = new User({
  method: "local",
  _id: employeeOneId,
  fullName: "employeeOne",
  email: "employeeOne@gmail.com",
  password: "123456",
  roles: [1, 2]
});
const employeeOneToken = signToken(employeeOne);

const employeeTwoId = new mongoose.Types.ObjectId();
const employeeTwo = new User({
  method: "local",
  _id: employeeTwoId,
  fullName: "employeeTwo",
  email: "employeeTwo@gmail.com",
  password: "123456",
  roles: [1, 2]
});
const employeeTwoToken = signToken(employeeTwo);

const businessOwnerOneId = new mongoose.Types.ObjectId();
const businessOwnerOne = new User({
  method: "local",
  _id: businessOwnerOneId,
  fullName: "businessOwnerOne",
  email: "businessOwnerOne@gmail.com",
  password: "123456",
  roles: [1, 2, 3]
});
const businessOwnerOneToken = signToken(businessOwnerOne);

const businessOwnerTwoId = new mongoose.Types.ObjectId();
const businessOwnerTwo = new User({
  method: "local",
  _id: businessOwnerTwoId,
  fullName: "businessOwnerTwo",
  email: "businessOwnerTwo@gmail.com",
  password: "123456",
  roles: [1, 2, 3]
});
const businessOwnerTwoToken = signToken(businessOwnerTwo);


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
      employeeOne,
      employeeTwo,
      businessOwnerOne,
      businessOwnerTwo,
      admin]
  );
};

module.exports = {
  userOne,
  userOneToken,
  userTwo,
  userTwoToken,
  employeeOne,
  employeeOneToken,
  employeeTwo,
  employeeTwoToken,
  businessOwnerOne,
  businessOwnerOneToken,
  businessOwnerTwo,
  businessOwnerTwoToken,
  admin,
  adminToken,
  setupUserDB
};
