const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const businessTypeSchema = new Schema({
  businessTypeName: {
    type: String,
    required: true
  },
  sector: {
    type: Schema.Types.ObjectId,
    ref: "Sector"
  }
});

module.exports = mongoose.model("BusinessType", businessTypeSchema);
