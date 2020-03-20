const Response = require("../helpers/response");
const CommonError = require("../errors/CommonError");

function roleCheck(allowedRoles) {
  return function(req, res, next) {
    try {
      const { roles } = req.userData;
      if (allowedRoles.some(role => roles.includes(role))) next();
      else Response.withError(res, CommonError.notAuthorized());
    } catch (err) {
      console.log("ROLE CHECKER ERROR: ", err);
      Response.withError(res, CommonError.serverError());
    }
  };
}

module.exports = roleCheck;
