const express = require("express");

const businessController = require("../controllers/businessController");

const router = new express.Router();

router.post("/createBusiness", businessController.createBusiness);

module.exports = router;
