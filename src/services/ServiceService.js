const ServiceDataAccess = require("../dataAccess/Service");
const SectorDataAccess = require("../dataAccess/Sector");
const BusinessTypeDataAccess = require("../dataAccess/BusinessType");
const AdminError = require("../errors/AdminError");

exports.createServiceService = async (serviceName, businessType) => {
  const service = await ServiceDataAccess.findServiceDB({ serviceName });
  if (service) {
    throw AdminError.ServiceAlreadyExists();
  }

  return ServiceDataAccess.insertOneServiceDB(serviceName, businessType);
};

exports.getAllServices = async () => {
  const servicesList = await ServiceDataAccess.findAllServicesDB();
  if (!servicesList) {
    throw AdminError.ServicesNotFound();
  }
  return servicesList;
};

exports.getServiceListByBusinessService = async businessTypeId => {
  const serviceList = await ServiceDataAccess.findServiceListByBusinessTypeDB(businessTypeId);
  if (!serviceList) {
    throw AdminError.ServicesNotFoundByGivenBusinessType();
  }

  return serviceList;
};

exports.updateServiceService = async (serviceId, serviceName, businessType) => {
  const service = await ServiceDataAccess.findServiceByIdDB(serviceId);
  const searchedBusinessType = await BusinessTypeDataAccess.findBusinessTypeByIdDB(businessType);

  if (!service) {
    throw AdminError.ServiceNotFound();
  }
  if (service.serviceName === serviceName) {
    throw AdminError.ServiceAlreadyExists();
  }
  if (!searchedBusinessType) {
    throw AdminError.BusinessTypeNotFound();
  }

  return ServiceDataAccess.updateServiceDB(service, serviceName, businessType);
};

exports.deleteServiceService = async id => {
  const service = await ServiceDataAccess.findServiceByIdDB(id);
  if (!service) {
    return AdminError.ServiceNotFound();
  }

  return ServiceDataAccess.deleteServiceByIdDB(service, id);
};
