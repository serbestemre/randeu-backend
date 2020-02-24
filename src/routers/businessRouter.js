const express = require("express");
const validator = require("../helpers/validate");
const { verifyToken } = require("../middleware/token");
const { roleCheck } = require("../middleware/roleAuth");

const businessController = require("../controllers/businessController");

const router = new express.Router();

router.post("/createBusiness", validator, businessController.createBusiness);
router.put("/updateBusiness", validator, businessController.updateBusiness);
router.delete(
  "/deleteBusiness",
  validator,
  verifyToken,
  roleCheck,
  businessController.deleteBusiness
);

router.post("/addService", validator, businessController.addService);
router.delete("/deleteService", validator, businessController.deleteService);

router.post("/hireEmployee", validator, businessController.hireEmployee);
router.delete(
  "/dischargeEmployee",
  validator,
  businessController.dischargeEmployee
);

router.post(
  "/employee/assignService",
  validator,
  businessController.assignService
);

module.exports = router;
