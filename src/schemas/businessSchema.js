const Joi = require("@hapi/joi");

module.exports = {
  createBusiness: Joi.object({
    businessName: Joi.string()
      .required()
      .empty(),
    address: Joi.string()
      .required()
      .empty(),
    sector: Joi.string()
      .required()
      .empty(),
    businessType: Joi.string()
      .required()
      .empty(),
    businessOwner: Joi.string()
      .required()
      .empty(),
    employeeList: Joi.array()
  })
};
