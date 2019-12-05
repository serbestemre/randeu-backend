const express = require("express");
const userController = require("../controllers/userController");

const router = new express.Router();

router.post("/signup", userController.signup);

router.get("/users", userController.getUsers);

module.exports = router;
