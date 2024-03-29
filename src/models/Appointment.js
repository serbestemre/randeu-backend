const mongoose = require("mongoose");
const CONSTANTS = require("../constants");

const Schema = mongoose.Schema;

const appointmentSchema = new mongoose.Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: "Business"
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service"
  },
  startDate: { type: Date },
  endDate: { type: Date },
  status: {
    type: String,
    enum: [...Object.values(CONSTANTS.STATUS)],
    default: CONSTANTS.STATUS.WAITING
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
