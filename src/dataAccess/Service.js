const Service = require("../models/Service");

exports.findServiceDB = async serviceName => Service.findOne(serviceName);

exports.findServiceListByBusinessDB = async businessType => Service.find({ businessType });

exports.findServiceById = async searchedService => Service.findById(searchedService);

exports.deleteService = async foundService => Service.deleteOne(foundService);
