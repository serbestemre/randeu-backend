const Joi = require("@hapi/joi");

module.exports = {
  createSector: Joi.object({
    sectorName: Joi.string()
      .required()
      .empty()
  }),
  updateSector: Joi.object({
    searchedSector: Joi.string()
      .required()
      .empty(),
    updatedSectorName: Joi.string()
      .required()
      .trim()
      .empty()
  }),
  deleteSector: Joi.object({
    searchedSector: Joi.string()
      .required()
      .empty()
  }),
  createService: Joi.object({
    serviceName: Joi.string()
      .required()
      .trim()
      .empty(),
    businessType: Joi.string()
      .required()
      .empty()
  }),
  serviceList: Joi.object({
    businessType: Joi.string()
      .required()
      .trim()
      .empty()
  }),
  updateService: Joi.object({
    foundServiceId: Joi.string()
      .required()
      .empty(),
    updatedServiceName: Joi.string()
      .required()
      .trim()
      .empty(),
    updatedBusinessType: Joi.string()
      .required()
      .empty()
  }),
  deleteService: Joi.object({
    serviceId: Joi.string()
      .required()
      .trim()
      .empty()
  }),
  createBusinessType: Joi.object({
    sector: Joi.string()
      .required()
      .empty(),
    businessTypeName: Joi.string()
      .required()
      .empty()
  }),
  deleteBusinessType: Joi.object({
    searchedBusinessType: Joi.string().required()
  }),
  updateBusinessType: Joi.object({
    searchedBusinessType: Joi.string()
      .required()
      .empty(),
    updatedBusinessTypeName: Joi.string()
      .max(50)
      .required()
      .empty(),
    updatedSector: Joi.string()
      .required()
      .empty()
  }),
  getBusinessTypesBySector: Joi.object({
    sector: Joi.string()
      .required()
      .empty()
  })
};
