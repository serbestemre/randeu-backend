const JWT = require("jsonwebtoken");
const Response = require("../helpers/response");
const CommonError = require("../errors/CommonError");

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.userData = decodedToken;
    next();
  } catch (error) {
    return Response.withError(res, CommonError.notAuthorized());
  }
};
