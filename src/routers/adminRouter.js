const express = require("express");
const validator = require("../helpers/validate");
const router = express.Router({ mergeParams: true });

const adminController = require("../controllers/adminController");

router.post("/createSector", adminController.createSector);

router.post("/createBusinessType", adminController.createBusinessType);

router.put(
  "/updateBusinessType",
  validator,
  adminController.updateBusinessType
);

router.delete(
  "/deleteBusinessType",
  validator,
  adminController.deleteBusinessType
);

router.post("/createService", adminController.createService);

module.exports = router;
