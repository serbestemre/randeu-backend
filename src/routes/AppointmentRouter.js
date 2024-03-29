const express = require("express");
// const CONSTANTS = require("../constants");
// const roleChecker = require("../middleware/RoleChecker");
const joiValidator = require("../middleware/JoiValidator");
const appointmentSchema = require("../schemas/AppointmentSchema");
// const { verifyToken } = require("../middleware/Token");

const router = express.Router({ mergeParams: true });

const AppointmentController = require("../controllers/AppointmentController");

router.post(
  "/request",
  AppointmentController.requestAppointment
);

router.post(
  "/businessCalendar",
  // joiValidator(appointmentSchema.getBusinessCalendar),
  AppointmentController.businessCalendar
);


router.get(
  "/businessCalendar/:employeeId",
  AppointmentController.employeeCalendar
);

module.exports = router;
