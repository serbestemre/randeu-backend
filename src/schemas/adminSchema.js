const Joi = require("@hapi/joi");

module.exports = {
  createSector: Joi.object({
    sectorName: Joi.string()
      .required()
      .empty()
  }),
  updateSector: Joi.object({
    updatedSectorId: Joi.string()
      .required()
      .empty(),
    updatedSectorName: Joi.string()
      .required()
      .trim()
      .empty()
  }),
  deleteSector: Joi.object({
    sectorId: Joi.string()
      .required()
      .empty()
  }),
  createService: Joi.object({
    serviceName: Joi.string()
      .required()
      .trim()
      .empty(),
    businessTypeID: Joi.string()
      .required()
      .empty()
  }),
  createBusinessType: Joi.object({
    sectorId: Joi.string()
      .required()
      .empty(),
    businessTypeName: Joi.string()
      .required()
      .empty()
  }),
  deleteBusinessType: Joi.object({
    businessTypeId: Joi.string().required()
  }),
  updateBusinessType: Joi.object({
    updatingBusinessTypeId: Joi.string()
      .required()
      .empty(),
    uptadedValueBusinessTypeName: Joi.string()
      .max(50)
      .required()
      .empty(),
    uptadedValueSector: Joi.string()
      .required()
      .empty()
  }),
  getBusinessTypesBySector: Joi.object({
    sectorId: Joi.string()
      .required()
      .empty()
  })
};
