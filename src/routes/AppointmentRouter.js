const express = require("express");
const CONSTANTS = require("../constants");
const roleChecker = require("../middleware/RoleChecker");
const joiValidator = require("../middleware/JoiValidator");
const appointmentSchema = require("../schemas/AppointmentSchema");
const { verifyToken } = require("../middleware/Token");

const router = express.Router({ mergeParams: true });

const AppointmentController = require("../controllers/AppointmentController");

router.post(
  "/request",
  joiValidator(appointmentSchema.request),
  verifyToken,
  roleChecker([CONSTANTS.ROLES.USER]),
  AppointmentController.requestAppointment
);

router.get(
  "/businessCalendar",
  AppointmentController.businessCalendar
);

module.exports = router;
