const Joi = require("@hapi/joi");

module.exports = {
  request: Joi.object({
    customerId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/)
      .empty()
      .messages({
        "string.base": "Müşteri adı yazı tipinde olmalı",
        "string.empty": "Müşteri adı boş bırakılamaz",
        "string.pattern.base": "Sektör adı değişik tipinde olmalı"
      }),
    businessId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/)
      .empty()
      .messages({
        "string.base": "Müşteri adı yazı tipinde olmalı",
        "string.empty": "Müşteri adı boş bırakılamaz",
        "string.pattern.base": "Sektör adı değişik tipinde olmalı"
      }),
    employeeId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/)
      .empty()
      .messages({
        "string.base": "Müşteri adı yazı tipinde olmalı",
        "string.empty": "Müşteri adı boş bırakılamaz",
        "string.pattern.base": "Sektör adı değişik tipinde olmalı"
      }),
    serviceId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/)
      .empty()
      .messages({
        "string.base": "Müşteri adı yazı tipinde olmalı",
        "string.empty": "Müşteri adı boş bırakılamaz",
        "string.pattern.base": "Sektör adı değişik tipinde olmalı"
      }),
    date: Joi.string()
      .required()
      .empty()
      .messages({
        "string.base": "Müşteri adı yazı tipinde olmalı",
        "string.empty": "Müşteri adı boş bırakılamaz",
        "string.pattern.base": "Sektör adı değişik tipinde olmalı"
      })
  })
};
