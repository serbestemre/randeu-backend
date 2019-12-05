const express = require('express');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/signup', authController.signup);
router.post('/login', auth, authController.login);

module.exports = router;
