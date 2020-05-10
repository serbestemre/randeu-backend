const UserDataAccess = require("../dataAccess/User");
const UserError = require("../errors/UserError");

exports.profileService = async userId => {
  const user = UserDataAccess.findUserByIdDB(userId);

  if (!user)
    throw UserError.UserNotFound();
  return user;
};
