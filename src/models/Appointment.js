const moment = require("moment-timezone");
const mongoose = require("mongoose");
const CONSTANTS = require("../constants");

const Schema = mongoose.Schema;

const dateIstanbul = moment.tz(Date.now(), "Europe/Istanbul");
const hourType = moment().format("HH:mm");

const appointmentSchema = new mongoose.Schema(
  {
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
    // date: { type: Date, default: dateIstanbul },
    status: {
      type: String,
      enum: [...Object.values(CONSTANTS.STATUS)],
      default: CONSTANTS.STATUS.WAITING
    },
    day: { type: String },
    hour: { type: String }
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
