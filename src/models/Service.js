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
}, { collation: { locale: "tr", strength: 1 } });

module.exports = mongoose.model("Service", serviceSchema);
