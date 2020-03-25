const Service = require("../models/Service");

exports.insertManySectorsDB = async services => Service.insertMany(services);

exports.findServiceDB = async serviceName => Service.findOne(serviceName);


exports.findServiceListByBusinessTypeDB = async businessType => Service.find({ businessType });

exports.findServiceListByBusinessDB = async businessType =>
  Service.find({ businessType });


exports.findServiceByIdDB = async searchedService =>
  Service.findById(searchedService);


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

exports.deleteServiceDB = async foundService => Service.deleteOne(foundService);

exports.deleteManySectorsDB = async () => Service.deleteMany();
