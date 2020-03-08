const Sector = require("../models/Sector");

exports.getSector = async query => Sector.findOne(query);

exports.getSectors = async () => Sector.find();

exports.getSectorById = async query => Sector.findById(query);

exports.deleteSector = async query => Sector.deleteOne(query);
