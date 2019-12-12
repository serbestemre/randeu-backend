const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
// eslint-disable-next-line no-unused-vars
const auth = require('../middleware/auth');

const router = new express.Router();

const passportSigIn = passport.authenticate('local', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/register').post(authController.register);
router.route('/login').post(passportSigIn, authController.login);
router.route('/oauth/google').post(passportGoogle, authController.googleOAuth);
router.route('/secret').get(passportJWT, authController.secret);

module.exports = router;
