const express = require("express");
const validator = require("../helpers/validate");
const { verifyToken } = require("../middleware/token");
const { roleCheck } = require("../middleware/roleAuth");

const router = express.Router({ mergeParams: true });

const adminController = require("../controllers/adminController");

router.post(
  "/createSector",
  validator,
  verifyToken,
  roleCheck,
  adminController.createSector
);

// Get all sector list
router.get("/sectorList", verifyToken, roleCheck, adminController.getSectors);

// Update a sector according to the given ID in parameter
router.put(
  "/updateSector",
  validator,
  verifyToken,
  roleCheck,
  adminController.updateSector
);

router.delete(
  "/deleteSector",
  validator,
  verifyToken,
  roleCheck,
  adminController.deleteSector
);

router.post(
  "/createBusinessType",
  validator,
  verifyToken,
  roleCheck,
  adminController.createBusinessType
);

router.put(
  "/updateBusinessType",
  validator,
  verifyToken,
  roleCheck,
  adminController.updateBusinessType
);

router.delete(
  "/deleteBusinessType",
  validator,
  verifyToken,
  roleCheck,
  adminController.deleteBusinessType
);

router.get(
  "/businessTypeList",
  validator,
  verifyToken,
  roleCheck,
  adminController.getBusinessTypesBySector
);

router.post(
  "/createService",
  validator,
  verifyToken,
  roleCheck,
  adminController.createService
);

router.get(
  "/serviceList",
  validator,
  verifyToken,
  roleCheck,
  adminController.getServiceListByBusiness
);

router.put(
  "/updateService",
  validator,
  verifyToken,
  roleCheck,
  adminController.updateService
);

router.delete(
  "/deleteService",
  validator,
  verifyToken,
  roleCheck,
  adminController.deleteService
);

module.exports = router;
