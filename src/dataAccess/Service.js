const Service = require("../models/Service");

exports.insertManySectorsDB = async services => Service.insertMany(services);

exports.findServiceDB = async serviceName => Service.findOne(serviceName);

exports.findServiceListByBusinessDB = async businessType =>
  Service.find({ businessType });

exports.findServiceByIdDB = async searchedService =>
  Service.findById(searchedService);

exports.deleteServiceDB = async foundService => Service.deleteOne(foundService);

exports.deleteManySectorsDB = async () => Service.deleteMany();
