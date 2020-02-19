const Joi = require("@hapi/joi");

module.exports = {
  deleteBusinessType: Joi.object({
    businessTypeId: Joi.string().required()
  })
};
