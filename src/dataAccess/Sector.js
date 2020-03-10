const Sector = require("../models/Sector");

exports.findSectorByNameDB = async sectorName => Sector.findOne(sectorName);

exports.findSectorsDB = async () => Sector.find();

exports.findSectorByIdDB = async sectorId => Sector.findById(sectorId);

exports.deleteSectorByIdDB = async sectorId => Sector.deleteOne(sectorId);
