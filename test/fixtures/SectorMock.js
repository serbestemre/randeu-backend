const mongoose = require("mongoose");

const Sector = require("../../src/models/Sector");
const SectorDatabaseAccess = require("../../src/dataAccess/Sector");

const sectorPersonalCareId = new mongoose.Types.ObjectId();
const sectorPersonalCare = new Sector({
  _id: sectorPersonalCareId,
  sectorName: "Kişisel Bakım"
});

const sectorHealthCareId = new mongoose.Types.ObjectId();
const sectorHealthCare = new Sector({
  _id: sectorHealthCareId,
  sectorName: "Sağlık"
});

const setupSectorDB = async () => {
  await SectorDatabaseAccess.deleteManySectorsDB();
  await SectorDatabaseAccess.insertManySectorsDB(
    [sectorPersonalCare, sectorHealthCare]
  );
};

module.exports = {
  sectorPersonalCare,
  sectorHealthCare,
  setupSectorDB
};
