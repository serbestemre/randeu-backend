const express = require("express");
const Passport = require("passport");
const AuthController = require("../controllers/AuthController");
const JoiValidator = require("../middleware/JoiValidator");
const AuthSchema = require("../schemas/AuthSchema");

const router = new express.Router();

const passportSigIn = Passport.authenticate("local", { session: false });
const passportGoogle = Passport.authenticate("googleToken", { session: false });
const passportFacebook = Passport.authenticate("facebookToken", {
  session: false
});

router.post(
  "/register",
  JoiValidator(AuthSchema.register),
  AuthController.register
);
router.post(
  "/login",
  JoiValidator(AuthSchema.login),
  passportSigIn,
  AuthController.login
);
router.post(
  "/account/send-activation-email",
  JoiValidator(AuthSchema.reSendActivationLink),
  AuthController.reSendActivationLink
);

router.get("/account/activate/:uuid", AuthController.activateUserAccount);
router.post("/oauth/google", passportGoogle, AuthController.googleOAuth);
router.post("/oauth/facebook", passportFacebook, AuthController.facebookOAuth);

module.exports = router;
