const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
// eslint-disable-next-line no-unused-vars
const auth = require("../middleware/auth");

const validator = require("../helpers/validate");

const router = new express.Router();

const passportSigIn = passport.authenticate("local", { session: false });
const passportGoogle = passport.authenticate("googleToken", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
const passportFacebook = passport.authenticate("facebookToken", {
  session: false
});
router.post("/register", validator, authController.register);
router.post("/login", validator, passportSigIn, authController.login);
router.post("/oauth/google", passportGoogle, authController.googleOAuth);
router.post("/oauth/facebook", passportFacebook, authController.facebookOAuth);
router.get("/secret", passportJWT, authController.secret);

module.exports = router;
