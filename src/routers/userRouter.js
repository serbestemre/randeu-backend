const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = new express.Router();

router.get("/profile", auth, userController.viewProfile);

module.exports = router;
