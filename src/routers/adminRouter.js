const express = require("express");
const validator = require("../helpers/validate");
const joiValidator = require("../middleware/joiValidator");
const adminSchema = require("../schemas/adminSchema");
const { verifyToken } = require("../middleware/token");
const { roleCheck } = require("../middleware/roleAuth");

const router = express.Router({ mergeParams: true });

const adminController = require("../controllers/adminController");

router.post(
  "/createSector",
  joiValidator(adminSchema.createSector),
  verifyToken,
  roleCheck,
  adminController.createSector
);

// Get all sector list
router.get("/sectorList", verifyToken, roleCheck, adminController.getSectors);

// Update a sector according to the given ID in parameter
router.put(
  "/updateSector",
  joiValidator(adminSchema.updateSector),
  verifyToken,
  roleCheck,
  adminController.updateSector
);

router.delete(
  "/deleteSector",
  joiValidator(adminSchema.deleteSector),
  verifyToken,
  roleCheck,
  adminController.deleteSector
);

router.post(
  "/createBusinessType",
  joiValidator(adminSchema.createBusinessType),
  verifyToken,
  roleCheck,
  adminController.createBusinessType
);

router.put(
  "/updateBusinessType",
  joiValidator(adminSchema.updateBusinessType),
  verifyToken,
  roleCheck,
  adminController.updateBusinessType
);

router.delete(
  "/deleteBusinessType",
  joiValidator(adminSchema.deleteBusinessType),
  verifyToken,
  roleCheck,
  adminController.deleteBusinessType
);

router.get(
  "/businessTypeList",
  joiValidator(adminSchema.getBusinessTypesBySector),
  verifyToken,
  roleCheck,
  adminController.getBusinessTypesBySector
);

router.post(
  "/createService",
  joiValidator(adminSchema.createService),
  verifyToken,
  roleCheck,
  adminController.createService
);

router.get(
  "/serviceList",
  joiValidator(adminSchema.serviceList),
  verifyToken,
  roleCheck,
  adminController.getServiceListByBusiness
);

router.put(
  "/updateService",
  joiValidator(adminSchema.updateService),
  verifyToken,
  roleCheck,
  adminController.updateService
);

router.delete(
  "/deleteService",
  joiValidator(adminSchema.deleteService),
  verifyToken,
  roleCheck,
  adminController.deleteService
);

module.exports = router;
