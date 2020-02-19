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
  }),
  updateBusiness: Joi.object({
    updatingBusiness: Joi.string()
      .required()
      .empty(),
    updatedBusinessName: Joi.string().empty(),
    updatedAddress: Joi.string().empty(),
    updatedSector: Joi.string().empty(),
    updatedBusinessType: Joi.string().empty(),
    updatedBusinessOwner: Joi.string().empty(),
    updatedEmployeeList: Joi.array(),
    userId: Joi.string()
      .required()
      .empty()
  })
};
