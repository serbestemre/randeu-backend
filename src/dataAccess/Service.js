const Service = require("../models/Service");

exports.findServiceDB = async serviceName => Service.findOne(serviceName);

exports.findServiceListByBusinessDB = async id => Service.find(id);

exports.findServiceByIdDB = async searchedService => Service.findById(searchedService);

exports.deleteServiceByIdDB = async (service, serviceId) => {
  service.deleteOne({ serviceId });
  return service;
};

exports.insertOneServiceDB = async (serviceName, businessType) =>
  Service.create({
    serviceName,
    businessType
  });

exports.updateServiceDB = async (service, serviceName, businessType) => {
  service.serviceName = serviceName;
  service.businessType = businessType;
  return service.save();
};
