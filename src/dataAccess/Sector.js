const Sector = require("../models/Sector");

exports.insertOneSectorDB = async sectorName => {
  const newSector = new Sector({
    sectorName
  });
  return newSector.save();
};

exports.updateSector = async (updatedSectorName, sector) => {
  sector.sectorName = updatedSectorName;
  return sector.save();
};

exports.insertManySectorsDB = async sectors => Sector.insertMany(sectors);

exports.findSectorByNameDB = async sectorName => Sector.findOne(sectorName);

exports.findSectorsDB = async () => Sector.find();

exports.findSectorByIdDB = async searchedSector =>
  Sector.findById(searchedSector);

exports.deleteSectorByIdDB = async (sectorId, sector) => {
  sector.deleteOne({ sectorId });
  return sector;
};

exports.deleteManySectorsDB = async () => Sector.deleteMany();
