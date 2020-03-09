const Sector = require("../models/Sector");

exports.getSectorDB = async query => Sector.findOne(query);

exports.getSectorsDB = async () => Sector.find();

exports.getSectorByIdDB = async sectorId => Sector.findById(sectorId);

exports.deleteSectorDB = async sectorId => Sector.deleteOne(sectorId);
