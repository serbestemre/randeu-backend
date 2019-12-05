const express = require('express');
const userController = require('../controllers/userController');

const router = new express.Router();

router.post('/signup', userController.signup);

module.exports = router;
