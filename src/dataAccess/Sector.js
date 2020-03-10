const Sector = require("../models/Sector");

exports.findSectorByNameDB = async sectorName => Sector.findOne(sectorName);

exports.findSectorsDB = async () => Sector.find();

exports.findSectorByIdDB = async searchedSector => Sector.findById(searchedSector);

exports.deleteSectorByIdDB = async sectorId => Sector.deleteOne(sectorId);
