const Joi = require("@hapi/joi");

module.exports = {
  register: Joi.object({
    fullName: Joi.string()
      .required()
      .empty()
      .messages({
        "string.base": "Ad & Soyad alanı yazı tipinde olmalı",
        "string.empty": "Ad & Soyad alanı boş bırakılamaz",
        "any.required": "Ad & Soyad alanı boş bırakılamaz"
      }),
    email: Joi.string()
      .email()
      .required()
      .empty()
      .messages({
        "string.base": "Email alanı yazı tipinde olmalı",
        "string.empty": "Email alanı boş bırakılamaz",
        "string.email": "Lütfen geçerli email giriniz",
        "any.required": "Email alanı boş bırakılamaz"

      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.empty": "Şifre alanı boş bırakılamaz",
        "string.min": "Şifre en az 6 karakter olmalı",
        "any.required": "Şifre alanı boş bırakılamaz"

      }),
    passwordCheck: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.empty": "Şifre tekrar alanı boş bırakılamaz",
        "string.min": "Şifre (Tekrar) alanı en az 6 karakter olmalı",
        "any.required": "Şifre (Tekrar) alanı boş bırakılamaz"
      })
  }),
  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.base": "Email alanı yazı tipinde olmalı",
        "string.empty": "Email alanı boş bırakılamaz",
        "string.email": "Lütfen geçerli email giriniz",
        "any.required": "Email alanı boş bırakılamaz"
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.empty": "Şifre alanı boş bırakılamaz",
        "string.min": "Şifre en az 6 karakter olmalı",
        "any.required": "Şifre alanı boş bırakılamaz"
      })
  }),
  reSendActivationLink: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.base": "Email alanı yazı tipinde olmalı",
        "string.empty": "Email alanı boş bırakılamaz",
        "string.email": "Lütfen geçerli email giriniz",
        "any.required": "Email alanı boş bırakılamaz"
      })
  })
};
