const Joi = require('@hapi/joi');

module.exports = {
  request: Joi.object({
    customerId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/)
      .empty()
      .messages({
        "string.base": "Müşteri alanı yazı tipinde olmalı",
        "string.empty": "Müşteri alanı boş bırakılamaz",
        "string.pattern.base": "Sektör alanı değişik tipinde olmalı"
      }),
    businessId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/)
      .empty()
      .messages({
        "string.base": "İş yeri alanı yazı tipinde olmalı",
        "string.empty": "İş yeri alanı boş bırakılamaz",
        "string.pattern.base": "İş yeri alanı standartlara uygun değil"
      }),
    employeeId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/)
      .empty()
      .messages({
        "string.base": "Çalışan alanı yazı tipinde olmalı",
        "string.empty": "Çalışan alanı boş bırakılamaz",
        "string.pattern.base": "Çalışan alanı standartlara uygun değil"
      }),
    serviceId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/)
      .empty()
      .messages({
        "string.base": "Servis alanı yazı tipinde olmalı",
        "string.empty": "Servis alanı boş bırakılamaz",
        "string.pattern.base": "Servis alanı standartlara uygun değil"
      }),
    date: Joi.string()
  })
};
