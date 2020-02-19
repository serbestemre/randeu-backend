const Joi = require("@hapi/joi");

module.exports = {
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
