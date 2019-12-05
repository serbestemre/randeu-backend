<<<<<<< HEAD
const express = require('express');
const userController = require('../controllers/userController');

const router = new express.Router();

router.post('/signup', userController.signup);

module.exports = router;
=======
const express = require('express')
const userController = require('../controllers/userController')
const router = new express.Router()


router.post('/signup', userController.signup)

module.exports = router
>>>>>>> 34ab9ef0d89c5f90551dbfed43ae810eba909470
