const express = require('express');
const userController = require('../controllers/userController');
// eslint-disable-next-line no-unused-vars
const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/profile', userController.viewProfile);

router.delete('/profile', userController.deleteMyAccount);

router.post('/logout', userController.logout);

module.exports = router;
