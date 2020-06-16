const express = require("express");
const CONSTANTS = require("../constants");
const roleChecker = require("../middleware/RoleChecker");
const { verifyToken } = require("../middleware/Token");
const joiValidator = require("../middleware/JoiValidator");
const businessController = require("../controllers/BusinessController");
const businessSchema = require("../schemas/BusinessSchema");

const router = new express.Router();

router.post(
  "/register",
  joiValidator(businessSchema.createBusiness),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.USER]),
  businessController.createBusiness
);

router.post("/employeelist",
  businessController.employeeList);

router.put(
  "/profile/update/:businessId",
  joiValidator(businessSchema.updateBusiness),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.EMPLOYEE, CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.updateBusiness
);

router.get("/businessList",
  businessController.getBusinessList);

router.get(
  "/profile/:businessId",
  verifyToken,
  businessController.profile
);

router.post("/businesslist-by-businesstype", businessController.businesslistByBusinessType);

router.post("/businesslist-by-service", businessController.businesslistByService);

router.post("/businesslist-by-name", businessController.businesslistByName);

router.delete(
  "/profile/delete/:businessId",
  verifyToken,
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.deleteBusiness
);

// TODO pass joiValidator as middleware beside validator
router.post(
  "/hire-employee",
  joiValidator(businessSchema.hireEmployee),
  verifyToken,
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
  "/employee/assign-service",
  joiValidator(businessSchema.assignOrEditService),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.assignService
);

// router.put("/employee/editService", validator, businessController.editService);
router.delete(
  "/employee/remove-service",
  joiValidator(businessSchema.removeService),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER]),
  businessController.removeService
);

module.exports = router;
