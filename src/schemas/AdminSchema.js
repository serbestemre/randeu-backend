const Joi = require("@hapi/joi");

// TODO required olarak tanımlanan alanlar için
//  "any.required": " hata mesajı tanımla"

module.exports = {
  createSector: Joi.object({
    sectorName: Joi.string()
      .required()
      .regex(/[a-zA-Z]/)
      .empty()
      .messages({
        "string.base": "Sektör adı yazı tipinde olmalı",
        "string.empty": "Sektör adı boş bırakılamaz",
        "string.pattern.base": "Sektör adı değişik tipinde olmalı"
      })
  }),
  updateSector: Joi.object({
    updatedSectorName: Joi.string()
      .required()
      .trim()
      .empty()
      .messages({
        "string.base": "Sektör adı yazı tipinde olmalı",
        "string.empty": "Sektör adı boş bırakılamaz"
      })
  }),
  createService: Joi.object({
    serviceName: Joi.string()
      .required()
      .trim()
      .empty()
      .messages({
        "string.base": "Servis yazı tipinde olmalı",
        "string.empty": "Servis boş bırakılamaz"
      }),
    businessType: Joi.string()
      .required()
      .empty()
      .messages({
        "string.base": "İşyeri tipi yazı tipinde olmalı",
        "string.empty": "İşyeri tipi boş bırakılamaz"
      })
  }),
  updateService: Joi.object({
    updatedServiceName: Joi.string()
      .required()
      .trim()
      .empty()
      .messages({
        "string.base": "Güncellenen servis ismi yazı tipinde olmalı",
        "string.empty": "Güncellenen servis ismi boş bırakılamaz"
      }),
    updatedBusinessType: Joi.string()
      .required()
      .empty()
      .messages({
        "string.base": "Güncellenen işyeri tipi yazı tipinde olmalı",
        "string.empty": "Güncellenen işyeri tipi boş bırakılamaz"
      })
  }),
  createBusinessType: Joi.object({
    sector: Joi.string()
      .required()
      .empty()
      .messages({
        "string.base": "Sektör alanı yazı tipinde olmalı",
        "string.empty": "Sektör alanı boş bırakılamaz"
      }),
    businessTypeName: Joi.string()
      .required()
      .empty()
      .messages({
        "string.base": "İşyeri tipi yazı tipinde olmalı",
        "string.empty": "İşyeri tipi boş bırakılamaz"
      })
  }),
  updateBusinessType: Joi.object({
    updatedBusinessTypeName: Joi.string()
      .max(50)
      .required()
      .empty()
      .messages({
        "string.base": "Güncellenen işyeri tipi yazı tipinde olmalı",
        "string.empty": "Güncellenen işyeri tipi boş bırakılamaz"
      }),
    updatedSector: Joi.string()
      .required()
      .empty()
      .messages({
        "string.base": "Güncellenen sektör yazı tipinde olmalı",
        "string.empty": "Güncellenen sektör boş bırakılamaz"
      })
  })
};
