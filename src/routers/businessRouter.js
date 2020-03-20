const express = require("express");
const validator = require("../helpers/validate");
const { verifyToken } = require("../middleware/token");
const { roleCheck } = require("../middleware/roleAuth");
const joiValidator = require("../middleware/joiValidator");
const businessController = require("../controllers/businessController");
const businessSchema = require("../schemas/businessSchema");

const router = new express.Router();

router.post(
  "/createBusiness",
  joiValidator(businessSchema.createBusiness),
  verifyToken,
  roleCheck,
  businessController.createBusiness
);

router.put(
  "/updateBusiness",
  joiValidator(businessSchema.updateBusiness),
  verifyToken,
  roleCheck,
  businessController.updateBusiness
);

router.get(
  "/profile",
  joiValidator(businessSchema.profile),
  verifyToken,
  roleCheck,
  businessController.profile
);

router.delete(
  "/deleteBusiness",
  joiValidator(businessSchema.deleteBusiness),
  verifyToken,
  roleCheck,
  businessController.deleteBusiness
);

router.post("/hireEmployee", validator, businessController.hireEmployee);
router.delete(
  "/dischargeEmployee",
  joiValidator(businessSchema.dischargeEmployee),
  verifyToken,
  roleCheck,
  businessController.dischargeEmployee
);

router.post(
  "/employee/assignService",
  joiValidator(businessSchema.assignOrEditService),
  verifyToken,
  roleCheck,
  businessController.assignService
);

// router.put("/employee/editService", validator, businessController.editService);
router.delete(
  "/employee/removeService",
  joiValidator(businessSchema.removeService),
  verifyToken,
  roleCheck,
  businessController.removeService
);

module.exports = router;
