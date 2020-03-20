const Joi = require("@hapi/joi");

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
    searchedSector: Joi.string()
      .required()
      .empty()
      .messages({
        "string.base": "Aranan sektör alanı yazı tipinde olmalı",
        "string.empty": "Aranan sektör boş bırakılamaz"
      }),
    updatedSectorName: Joi.string()
      .required()
      .trim()
      .empty()
      .messages({
        "string.base": "Sektör adı yazı tipinde olmalı",
        "string.empty": "Sektör adı boş bırakılamaz"
      })
  }),
  deleteSector: Joi.object({
    searchedSector: Joi.string()
      .required()
      .empty()
      .messages({
        "string.base": "Silinecek sektör yazı tipinde olmalı",
        "string.empty": "Silinecek sektör boş bırakılamaz"
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
  serviceList: Joi.object({
    businessType: Joi.string()
      .required()
      .trim()
      .empty()
      .messages({
        "string.base": "İşyeri tipi yazı tipinde olmalı",
        "string.empty": "İşyeri tipi boş bırakılamaz"
      })
  }),
  updateService: Joi.object({
    searchedService: Joi.string()
      .required()
      .empty()
      .messages({
        "string.base": "Aranan servis yazı tipinde olmalı",
        "string.empty": "Aranan servis boş bırakılamaz"
      }),
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
  deleteService: Joi.object({
    serviceId: Joi.string()
      .required()
      .trim()
      .empty()
      .messages({
        "string.base": "Servis id yazı tipinde olmalı",
        "string.empty": "Servis id boş bırakılamaz"
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
  deleteBusinessType: Joi.object({
    searchedBusinessType: Joi.string()
      .required()
      .empty()
      .messages({
        "string.base": "Silinecek işyeri tipi yazı olmalı",
        "string.empty": "Silinecek işyeri tipi boş bırakılamaz"
      })
  }),
  updateBusinessType: Joi.object({
    searchedBusinessType: Joi.string()
      .required()
      .empty()
      .messages({
        "string.base": "Aranan işyeri yazı tipinde olmalı",
        "string.empty": "Aranan işyeri boş bırakılamaz"
      }),
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
  }),
  getBusinessTypesBySector: Joi.object({
    sector: Joi.string()
      .required()
      .empty()
  })
};
