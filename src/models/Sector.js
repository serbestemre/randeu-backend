const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sectorSchema = new Schema({
  sectorName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Sector", sectorSchema);
