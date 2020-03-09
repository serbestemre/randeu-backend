const Sector = require("../models/Sector");

exports.getSector = async query => Sector.findOne(query);

exports.getSectors = async () => Sector.find();

exports.getSectorById = async sectorId => Sector.findById(sectorId);

exports.deleteSector = async sectorId => Sector.deleteOne(sectorId);
