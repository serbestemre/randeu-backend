const express = require("express");
const CONSTANTS = require("../constants");
const roleChecker = require("../middleware/roleChecker");
const joiValidator = require("../middleware/joiValidator");
const adminSchema = require("../schemas/adminSchema");
const { verifyToken } = require("../middleware/token");

const router = express.Router({ mergeParams: true });

const adminController = require("../controllers/adminController");

router.post(
  "/createSector",
  joiValidator(adminSchema.createSector),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.createSector
);

// Get all sector list
router.get(
  "/sectorList",
  verifyToken,
  roleChecker([CONSTANTS.ROLES.BUSINESS_OWNER, CONSTANTS.ROLES.SUPER_USER]),
  adminController.getSectors
);

// Update a sector according to the given ID in parameter
router.put(
  "/updateSector",
  joiValidator(adminSchema.updateSector),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.updateSector
);

router.delete(
  "/deleteSector",
  joiValidator(adminSchema.deleteSector),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.deleteSector
);

router.post(
  "/createBusinessType",
  joiValidator(adminSchema.createBusinessType),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.createBusinessType
);

router.put(
  "/updateBusinessType",
  joiValidator(adminSchema.updateBusinessType),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.updateBusinessType
);

router.delete(
  "/deleteBusinessType",
  joiValidator(adminSchema.deleteBusinessType),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.deleteBusinessType
);

router.get(
  "/businessTypeList",
  joiValidator(adminSchema.getBusinessTypesBySector),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.getBusinessTypesBySector
);

router.post(
  "/createService",
  joiValidator(adminSchema.createService),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.createService
);

router.get(
  "/serviceList",
  joiValidator(adminSchema.serviceList),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.getServiceListByBusiness
);

router.put(
  "/updateService",
  joiValidator(adminSchema.updateService),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.updateService
);

router.delete(
  "/deleteService",
  joiValidator(adminSchema.deleteService),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.deleteService
);

module.exports = router;
