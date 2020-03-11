const Service = require("../models/Service");

exports.findServiceDB = async serviceName => Service.findOne(serviceName);

exports.findServiceListByBusinessDB = async businessType => Service.find({ businessType });

exports.findServiceByIdDB = async searchedService => Service.findById(searchedService);

exports.deleteServiceDB = async foundService => Service.deleteOne(foundService);
