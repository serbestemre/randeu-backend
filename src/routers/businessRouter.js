const express = require("express");
const validator = require("../helpers/validate");

const businessController = require("../controllers/businessController");

const router = new express.Router();

router.post("/createBusiness", validator, businessController.createBusiness);
router.put("/updateBusiness", validator, businessController.updateBusiness);

module.exports = router;
