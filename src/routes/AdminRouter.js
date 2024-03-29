const express = require("express");
const CONSTANTS = require("../constants");
const roleChecker = require("../middleware/RoleChecker");
const joiValidator = require("../middleware/JoiValidator");
const adminSchema = require("../schemas/AdminSchema");
const { verifyToken } = require("../middleware/Token");

const router = express.Router({ mergeParams: true });

const adminController = require("../controllers/AdminController");

router.post(
  "/sector",
  joiValidator(adminSchema.createSector),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.createSector
);


router.get(
  "/sectors",
  adminController.getSectors
);

// Update a sector according to the given ID in parameter
router.put(
  "/sector/:sectorId",
  joiValidator(adminSchema.updateSector),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.updateSector
);

router.delete(
  "/sector/:sectorId",
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.deleteSector
);

router.post(
  "/businesstype",
  joiValidator(adminSchema.createBusinessType),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.createBusinessType
);

router.put(
  "/businesstype/:businessTypeId",
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.updateBusinessType
);

router.delete(
  "/businesstype/:businessTypeId",
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.deleteBusinessType
);

router.get(
  "/businesstypes/:sectorId",
  adminController.getBusinessTypesBySector
);

router.get("/businesstypes", adminController.getAllBusinessTypes);

router.post(
  "/service",
  joiValidator(adminSchema.createService),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.createService
);

router.get(
  "/services/:businessTypeId",
  adminController.getServiceListByBusiness
);

router.get("/services", adminController.getAllServices);

router.put(
  "/service/:serviceId",
  joiValidator(adminSchema.updateService),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.updateService
);

router.delete(
  "/service/:serviceId",
  verifyToken,
  roleChecker([CONSTANTS.ROLES.SUPER_USER]),
  adminController.deleteService
);

module.exports = router;
