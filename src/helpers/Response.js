const response = {};

response.success = (res, success, result) => {
  const { statusCode = 200, message } = success;
  const data = result;
  return res.status(statusCode).json({
    message,
    data
  });
};

response.withError = (res, error) => {
  const { statusCode = 500, message, data } = error;
  return res.status(statusCode).json({
    message,
    data
  });
};

module.exports = response;
