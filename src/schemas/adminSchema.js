const Joi = require('@hapi/joi');

module.exports = {
  createSector: Joi.object({
    sectorName: Joi.string()
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
