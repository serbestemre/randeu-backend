const JWT = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed"
    });
  }
};
