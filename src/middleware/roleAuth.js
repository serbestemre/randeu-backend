const { ENDPOINTS_SCHEMAS } = require("../constants");

exports.roleCheck = (req, res, next) => {
  const { authorization } = ENDPOINTS_SCHEMAS[req.originalUrl.slice(1)];
  const { roles } = req.userData;

  if (authorization.some(role => roles.includes(role))) next();
  else throw new Error("You are not authorized!");
};
