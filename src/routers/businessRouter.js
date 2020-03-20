const express = require("express");
const CONSTANTS = require("../constants");
const roleChecker = require("../middleware/roleChecker");
const { verifyToken } = require("../middleware/token");
const joiValidator = require("../middleware/joiValidator");
const businessController = require("../controllers/businessController");
const businessSchema = require("../schemas/businessSchema");

const router = new express.Router();

router.post(
  "/createBusiness",
  joiValidator(businessSchema.createBusiness),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.USER]),
  businessController.createBusiness
);

router.put(
  "/updateBusiness",
  joiValidator(businessSchema.updateBusiness),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.EMPLOYEE, CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.updateBusiness
);

router.get(
  "/profile",
  joiValidator(businessSchema.profile),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.EMPLOYEE, CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.profile
);

router.delete(
  "/deleteBusiness",
  joiValidator(businessSchema.deleteBusiness),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.deleteBusiness
);

// TODO pass joiValidator as middleware beside validator
router.post(
  "/hireEmployee",
  joiValidator(businessSchema.hireEmployee),
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.hireEmployee
);

router.delete(
  "/dischargeEmployee",
  joiValidator(businessSchema.dischargeEmployee),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.dischargeEmployee
);

router.post(
  "/employee/assignService",
  joiValidator(businessSchema.assignOrEditService),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.assignService
);

// router.put("/employee/editService", validator, businessController.editService);
router.delete(
  "/employee/removeService",
  joiValidator(businessSchema.removeService),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.removeService
);

module.exports = router;
