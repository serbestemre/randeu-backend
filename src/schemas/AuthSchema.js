const Joi = require("@hapi/joi");

module.exports = {
  register: Joi.object({
    fullName: Joi.string()
      .required()
      .empty()
      .messages({
        "string.base": "Tam ad alanı yazı tipinde olmalı",
        "string.empty": "Tam ad alanı boş bırakılamaz"
      }),
    email: Joi.string()
      .email()
      .required()
      .empty()
      .messages({
        "string.base": "Email alanı yazı tipinde olmalı",
        "string.empty": "Email alanı boş bırakılamaz",
        "string.email": "Lütfen geçerli email giriniz"
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.empty": "Şifre alanı boş bırakılamaz",
        "string.min": "Şifre en az 6 karakter olmalı"
      }),
    passwordCheck: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.empty": "Şifre tekrar alanı boş bırakılamaz",
        "string.min": "Şifre tekrar alanı en az 6 karakter olmalı"
      })
  }),
  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.base": "Email alanı yazı tipinde olmalı",
        "string.empty": "Email alanı boş bırakılamaz",
        "string.email": "Lütfen geçerli email giriniz"
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.empty": "Şifre alanı boş bırakılamaz",
        "string.min": "Şifre en az 6 karakter olmalı"
      })
  })
};
