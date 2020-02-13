const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  serviceName: {
    type: String,
    required: true
  },
  businessType: {
    type: Schema.Types.ObjectId,
    ref: "BusinessType"
  }
});

module.exports = mongoose.model("Service", serviceSchema);
