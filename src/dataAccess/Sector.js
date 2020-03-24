const Sector = require("../models/Sector");

exports.createSectorDB = async sectorName => {
  const newSector = new Sector({
    sectorName
  });
  return newSector.save();
};

exports.updateSector = async (updatedSectorName, sector) => {
  sector.sectorName = updatedSectorName;
  return sector.save();
};

exports.findSectorByNameDB = async sectorName => Sector.findOne(sectorName);

exports.findSectorsDB = async () => Sector.find();

exports.findSectorByIdDB = async searchedSector =>
  Sector.findById(searchedSector);

exports.deleteSectorByIdDB = async sectorId => Sector.deleteOne(sectorId);

exports.deleteManySectorsDB = async () => Sector.deleteMany();
