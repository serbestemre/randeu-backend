const express = require("express");
const validator = require("../helpers/validate");
const { verifyToken } = require("../middleware/token");
const { roleCheck } = require("../middleware/roleAuth");

const businessController = require("../controllers/businessController");

const router = new express.Router();

router.post(
  "/createBusiness",
  validator,
  verifyToken,
  roleCheck,
  businessController.createBusiness
);

router.put(
  "/updateBusiness",
  validator,
  verifyToken,
  roleCheck,
  businessController.updateBusiness
);

router.get(
  "/profile",
  validator,
  verifyToken,
  roleCheck,
  businessController.profile
);

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
  verifyToken,
  roleCheck,
  businessController.dischargeEmployee
);

router.post(
  "/employee/assignService",
  validator,
  verifyToken,
  roleCheck,
  businessController.assignService
);

// router.put("/employee/editService", validator, businessController.editService);
router.delete(
  "/employee/removeService",
  validator,
  verifyToken,
  roleCheck,
  businessController.removeService
);

module.exports = router;
