exports.roleCheck = (req, res, next) => {
  const schema = ENDPOINTS[req.originalUrl.slice(1)];

  try {
    const value = await schema.validateAsync(req.body);
    console.log(value);
    next();
  } catch (err) {
    console.log('Errrorr', err);
    return response.withError(res, commonError.validationError(err));
  }
};
