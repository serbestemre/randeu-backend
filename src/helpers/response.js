const response = {};

response.success = (res, code = 200, data, message = "") => {
  return res.status(code).json({
    message,
    data
  });
};

response.withError = (res, error) => {
  const { statusCode, message, data } = error;
  return res.status(statusCode).json({
    message,
    data
  });
};

module.exports = response;
