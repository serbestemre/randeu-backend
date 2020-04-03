const express = require("express");
const RoleChecker = require("../middleware/RoleChecker");
const CONSTANTS = require("../constants");
const { verifyToken } = require("../middleware/Token");
const userController = require("../controllers/UserController");

const router = new express.Router({ mergeParams: true });


router.get(
  "/profile/:userId",
  verifyToken,
  RoleChecker([CONSTANTS.ROLES.USER]),
  userController.profile
);


module.exports = router;
