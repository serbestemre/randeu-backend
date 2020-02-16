const Joi = require('@hapi/joi');

module.exports = {
  register: Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    passwordCheck: Joi.string()
      .min(6)
      .required()
  })
};
