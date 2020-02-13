const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/createSector", adminController.createSector);
router.post("/createBusinessType", adminController.createBusinessType);
router.post("/createService", adminController.createService);

module.exports = router;
