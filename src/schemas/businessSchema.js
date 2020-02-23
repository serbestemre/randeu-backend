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
      .empty()
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
    userId: Joi.string()
      .required()
      .empty()
  }),
  deleteBusiness: Joi.object({
    businessId: Joi.string()
      .empty()
      .required()
      .normalize()
  }),
  addService: Joi.object({
    serviceId: Joi.string()
      .empty()
      .required(),
    businessId: Joi.string()
      .empty()
      .required()
  }),
  deleteService: Joi.object({
    serviceId: Joi.string()
      .empty()
      .required(),
    businessId: Joi.string()
      .empty()
      .required()
  }),
  hireEmployee: Joi.object({
    userId: Joi.string()
      .empty()
      .required(),
    businessId: Joi.string()
      .empty()
      .required()
  }),
  dischargeEmployee: Joi.object({
    userId: Joi.string()
      .empty()
      .required(),
    businessId: Joi.string()
      .empty()
      .required()
  }),
  assignService: Joi.object({
    employeeId: Joi.string()
      .trim()
      .empty()
      .required(),
    serviceId: Joi.string()
      .trim()
      .empty()
      .required(),
    businessId: Joi.string()
      .trim()
      .empty()
      .required()
  }),
  editService: Joi.object({}),
  removeService: Joi.object({})
};
