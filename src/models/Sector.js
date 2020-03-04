const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sectorSchema = new Schema(
  {
    sectorName: {
      type: String,
      required: true
    }
  },
  { collation: { locale: "tr", strength: 1 } }
);

module.exports = mongoose.model("Sector", sectorSchema);
