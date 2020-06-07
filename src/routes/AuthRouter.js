const express = require("express");
const Passport = require("passport");
const AuthController = require("../controllers/AuthController");
const JoiValidator = require("../middleware/JoiValidator");
const AuthSchema = require("../schemas/AuthSchema");

// Dont delete this import
// eslint-disable-next-line no-unused-vars
const auth = require("../middleware/Auth");

const router = new express.Router();

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
