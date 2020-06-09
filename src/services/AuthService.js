const { v4 } = require("uuid");
const Redis = require("ioredis");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const UserDataAccess = require("../dataAccess/User");
const AuthError = require("../errors/AuthError");
const Email = require("../helpers/Email");

const redis = new Redis(process.env.REDIS_URL); // redis server burda mı çalıştırılmalı

const signToken = (user) =>
  JWT.sign(
    {
      iss: "Randeu",
      sub: user.id,
      iat: new Date().getTime(), // current time
      roles: user.roles,
      userId: user._id,
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    process.env.JWT_SECRET_KEY
  );

exports.registerService = async (fullName, email, password, passwordCheck) => {
  // check if there any user with the same email
  const foundUser = await UserDataAccess.findUserByEmailDB(email);

  if (password !== passwordCheck) throw AuthError.PasswordsNotMatch();

  if (foundUser) throw AuthError.UserAlreadyExists();

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await UserDataAccess.insertOneUserDB(
    "local",
    fullName,
    [1],
    email,
    hashedPassword
  );

  Email.sendWelcomeEmailToUser(email, fullName);

  const userId = user._id.toString();
  await this.createActivationLinkService(userId, user.email);
  return user;
};

exports.loginService = async (email, password) => {
  const user = await UserDataAccess.findUserByEmailDB(email);

  if (!user.isActive) throw AuthError.UserNotActive();

  if (!user) throw AuthError.WrongPasswordorEmail();

  const isMatch = await user.isValidPassword(password);

  if (!isMatch) throw AuthError.WrongPasswordorEmail();

  const token = signToken(user);

  return token;
};

exports.createActivationLinkService = async (userId, email) => {
  const uuid = v4(); // şifrelenmeli mi?
  await redis.set(uuid, userId);
  await redis.expire(uuid, 60 * 60 * 24);

  const activationLink = `${process.env.SERVER_URL}/account/activate/${uuid}`;

  Email.sendActivationEmailToUser(userId, email, activationLink);
};

exports.reSendActivationLinkService = async (email) => {
  const user = await UserDataAccess.findUserByEmailDB(email);
  if (!user) throw AuthError.UserNotFound();

  if (user.isActive) throw AuthError.UserAccountIsAlreadyActivated();

  const userId = user._id.toString();
  const uuid = v4();
  await redis.set(uuid, userId);
  await redis.expire(uuid, 60 * 60 * 24);

  const activationLink = `${process.env.SERVER_URL}/account/activate/${uuid}`;

  Email.sendActivationEmailToUser(userId, email, activationLink);
};

exports.activateUserAccountService = async (uuid) => {
  const userId = await redis.get(uuid);

  if (!userId) throw AuthError.ActivationLinkExpired();

  const user = await UserDataAccess.findUserByIdDB(userId);

  if (!user) throw AuthError.UserNotFound();

  if (user.isActive) throw AuthError.UserAccountIsAlreadyActivated();
  else await UserDataAccess.activateUserProfileDB(userId);
};
