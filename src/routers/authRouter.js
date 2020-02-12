const express = require("express");
const passport = require("passport");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
// eslint-disable-next-line no-unused-vars
const auth = require("../middleware/auth");

const router = new express.Router();

const passportSigIn = passport.authenticate("local", { session: false });
const passportGoogle = passport.authenticate("googleToken", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
const passportFacebook = passport.authenticate("facebookToken", {
  session: false
});

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Lütfen geçerli email giriniz")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Şifre 6 karakter veya fazla olmalı"),
    body("name")
      .trim()
      .not()
      .isEmpty(),
    body("surname")
      .trim()
      .not()
      .isEmpty()
  ],
  authController.register
);
router.post("/login", passportSigIn, authController.login);
router.post("/oauth/google", passportGoogle, authController.googleOAuth);
router.post("/oauth/facebook", passportFacebook, authController.facebookOAuth);
router.get("/secret", passportJWT, authController.secret);

module.exports = router;
