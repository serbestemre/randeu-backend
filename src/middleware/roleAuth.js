const { ENDPOINTS_SCHEMAS } = require("../constants");

const Response = require("../helpers/response");
const CommonError = require("../errors/CommonError");

exports.roleCheck = (req, res, next) => {
  const { authorization } = ENDPOINTS_SCHEMAS[req.originalUrl.slice(1)];
  const { roles } = req.userData;

  if (authorization.some(role => roles.includes(role))) next();
  else Response.withError(res, CommonError.notAuthorized());
};
