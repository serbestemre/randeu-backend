const express = require("express");
const CONSTANTS = require("../constants");
const roleChecker = require("../middleware/roleChecker");
const { verifyToken } = require("../middleware/token");
const joiValidator = require("../middleware/joiValidator");
const businessController = require("../controllers/businessController");
const businessSchema = require("../schemas/businessSchema");

const router = new express.Router();

router.post(
  "/register",
  joiValidator(businessSchema.createBusiness),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.USER]),
  businessController.createBusiness
);

router.put(
  "/profile/update/:id",
  joiValidator(businessSchema.updateBusiness),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.EMPLOYEE, CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.updateBusiness
);

router.get(
  "/profile/:id",
  joiValidator(businessSchema.profile),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.EMPLOYEE, CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.profile
);

router.delete(
  "/profile/delete/:id",
  joiValidator(businessSchema.deleteBusiness),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.deleteBusiness
);

// TODO pass joiValidator as middleware beside validator
router.post(
  "/hire-employee",
  joiValidator(businessSchema.hireEmployee),
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.hireEmployee
);

router.delete(
  "/discharge-employee",
  joiValidator(businessSchema.dischargeEmployee),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.dischargeEmployee
);

router.post(
  "/employee/assign-service/:id",
  joiValidator(businessSchema.assignOrEditService),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.assignService
);

// router.put("/employee/editService", validator, businessController.editService);
router.delete(
  "/employee/remove-service/:id",
  joiValidator(businessSchema.removeService),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.removeService
);

module.exports = router;
