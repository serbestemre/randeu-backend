const Joi = require("@hapi/joi");

module.exports = {
  createBusiness: Joi.object({
    businessName: Joi.string()
      .required()
      .empty()
      .regex(/[a-zA-Z0-9]/)
      .messages({
        "string.base": "İşyeri adı yazı tipinde olmalı",
        "string.empty": "İşyeri adı boş bırakılamaz",
        "string.pattern.base": "İşyeri adı yazı tipinde olmalı"
      }),
    address: Joi.string()
      .required()
      .empty()
      .messages({
        "string.empty": "Adres boş bırakılamaz"
      }),
    sector: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/)
      .empty()
      .messages({
        "string.pattern.base": "SectorId değeri standartlara uygun değil",
        "string.empty": "Sektör alanı boş bırakılamaz"
      }),
    businessType: Joi.string()
      .required()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": "BusinessTypeId değeri standartlara uygun değil",
        "string.empty": "İşyeri tipi alanı boş bırakılamaz"
      }),
    businessOwnerId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/)
      .empty()
      .messages({
        "string.pattern.base": "BusinessOwnerId değeri standartlara uygun değil",
        "string.empty": "İşyeri sahibi alanı boş bırakılamaz"
      })
  }),
  updateBusiness: Joi.object({
    updatedBusinessName: Joi.string()
      .empty()
      .regex(/[a-zA-Z0-9]/)
      // TODO not all the fields should be updating
      .messages({
        "string.base": "İşyeri adı yazı tipinde olmalı",
        "string.empty": "İşyeri adı boş geçilemez"
      }),
    updatedAddress: Joi.string()
      .empty()
      .messages({
        "string.empty": "Adres alanı boş bırakılamaz"
      }),
    updatedSector: Joi.string()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": "SectorId değeri standartlara uygun değil",
        "string.empty": "Güncellenen sektör boş bırakılamaz"
      }),
    updatedBusinessType: Joi.string()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": "BusinessTypeId değeri standartlara uygun değil",
        "string.empty": "İşyeri tipi boş bırakılamaz"
      }),
    updatedBusinessOwner: Joi.string().empty(),
    userId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/)
      .empty()
      .messages({
        "string.pattern.base": "BusinessOwnerId değeri standartlara uygun değil",
        "string.empty": "İşyeri sahibi alanı boş bırakılamaz"
      })
  }),
  profile: Joi.object({
    businessId: Joi.string()
      .trim()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "BusinessId değeri standartlara uygun değil",
        "string.empty": "İşyeri alanı boş bırakılamaz"
      })
  }),
  deleteBusiness: Joi.object({
    businessId: Joi.string()
      .empty()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/)
      .normalize()
      .messages({
        "string.pattern.base": "BusinessId değeri standartlara uygun değil",
        "string.empty": "İşyeri alanı boş bırakılamaz"
      })
  }),
  addService: Joi.object({
    serviceId: Joi.string()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "ServiceId değeri standartlara uygun değil",
        "string.empty": "Servis alanı boş bırakılamaz"
      }),
    businessId: Joi.string()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "BusinessId değeri standartlara uygun değil",
        "string.empty": "İşyeri alanı boş bırakılamaz"
      })
  }),
  deleteService: Joi.object({
    serviceId: Joi.string()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "ServiceId değeri standartlara uygun değil",
        "string.empty": "Servis alanı boş bırakılamaz"
      }),
    businessId: Joi.string()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "BusinessId değeri standartlara uygun değil",
        "string.empty": "İşyeri alanı boş bırakılamaz"
      })
  }),
  hireEmployee: Joi.object({
    userId: Joi.string()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "UserId değeri standartlara uygun değil",
        "string.empty": "Kullanıcı alanı boş bırakılamaz"
      }),
    businessId: Joi.string()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "BusinessId değeri standartlara uygun değil",
        "string.empty": "İşyeri alanı boş bırakılamaz"
      })
  }),
  dischargeEmployee: Joi.object({
    userId: Joi.string()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "UserId değeri standartlara uygun değil",
        "string.empty": "Kullanıcı alanı boş bırakılamaz"
      }),
    businessId: Joi.string()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "BusinessId değeri standartlara uygun değil",
        "string.empty": "İşyeri alanı boş bırakılamaz"
      })
  }),
  assignOrEditService: Joi.object({
    employeeId: Joi.string()
      .trim()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "EmployeeId değeri standartlara uygun değil",
        "string.empty": "İşçi alanı boş bırakılamaz"
      }),
    serviceId: Joi.string()
      .trim()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "ServiceId değeri standartlara uygun değil",
        "string.empty": "Servis alanı boş bırakılamaz"
      }),
    businessId: Joi.string()
      .trim()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "BusinessId değeri standartlara uygun değil",
        "string.empty": "İşyeri alanı boş bırakılamaz"
      }),
    price: Joi.number()
      .required()
      .messages({
        "number.base": "Fiyat alanı sayı değerinde olmalı"
      }),
    duration: Joi.number()
      .required()
      .messages({
        "number.base": "Fiyat alanı sayı değerinde olmalı"
      })
  }),
  removeService: Joi.object({
    employeeId: Joi.string()
      .trim()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "EmployeeId değeri standartlara uygun değil",
        "string.empty": "İşçi alanı boş bırakılamaz"
      }),
    serviceId: Joi.string()
      .trim()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "ServiceId değeri standartlara uygun değil",
        "string.empty": "Servis alanı boş bırakılamaz"
      }),
    businessId: Joi.string()
      .trim()
      .empty()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "BusinessId değeri standartlara uygun değil",
        "string.empty": "İşyeri alanı boş bırakılamaz"
      })
  })
};
