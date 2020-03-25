const ValidationError = require("mongoose").Error.ValidationError;
const CastError = require("mongoose").Error.CastError;

const BusinessTypeService = require("../services/BusinessTypeService");
const BusinessTypeDataAccess = require("../dataAccess/BusinessType");
const ServiceDataAccess = require("../dataAccess/Service");
const SectorService = require("../services/SectorService");
const AdminSuccess = require("../successes/AdminSuccess");
const SectorDataAccess = require("../dataAccess/Sector");
const BusinessType = require("../models/BusinessType");
const CustomError = require("../helpers/CustomError");
const CommonError = require("../errors/CommonError");
const AdminError = require("../errors/AdminError");
const Response = require("../helpers/Response");
const Service = require("../models/Service");
const Sector = require("../models/Sector");

exports.createService = async (req, res) => {
  const { serviceName, businessType } = req.body;

  console.log("service name => ", serviceName);
  try {
    const service = await ServiceDataAccess.findServiceDB({ serviceName });
    if (service)
      return Response.withError(res, AdminError.serviceAlreadyExists());

    const newService = new Service({
      serviceName,
      businessType
    });

    const result = await newService.save();
    Response.success(
      res,
      AdminSuccess.serviceCreated(),
      result
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "İşyeri tipleri listelenemedi!";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
  }
};

exports.getServiceListByBusiness = async (req, res) => {
  const _id = req.params.businessTypeId;
  try {
    const serviceList = await ServiceDataAccess.findServiceListByBusinessDB(_id);
    if (!serviceList)
      return Response.withError(res, AdminError.servicesNotFoundByGivenBusinessType);

    Response.success(
      res,
      AdminSuccess.servicesListedByBusiness(),
      { serviceList }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      // eslint-disable-next-line operator-linebreak
      error.message =
        "Servis listesi yüklenemedi çünkü iş tipi id değeri hatalı";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
  }
};

exports.updateService = async (req, res) => {
  const _id = req.params.serviceId;
  const { updatedServiceName, updatedBusinessType } = req.body;
  try {
    const service = await ServiceDataAccess.findServiceByIdDB(_id);

    if (!service) return Response.withError(res, AdminError.serviceNotFound());
    if (service.serviceName === updatedServiceName)
      return Response.withError(res, AdminError.serviceAlreadyExists());

    service.serviceName = updatedServiceName;
    service.businessType = updatedBusinessType;
    const result = await service.save();
    Response.success(
      res,
      AdminSuccess.serviceUpdated(),
      result
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "Güncellenmek istenen service id hatalı";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
  }
};

exports.deleteService = async (req, res) => {
  const _id = req.params.serviceId;
  try {
    const foundService = await ServiceDataAccess.findServiceByIdDB(_id);
    if (!foundService)
      return Response.withError(res, AdminError.serviceNotFound());

    await ServiceDataAccess.deleteServiceDB(foundService);

    Response.success(
      res,
      AdminSuccess.serviceDeleted(),
      { foundService }
    );
  } catch (error) {
    Response.withError(res, CommonError.serverError());
  }
};

exports.createSector = async (req, res) => {
  const sectorName = req.body.sectorName.trim();
  try {
    const sector = await SectorService.createSectorService(sectorName);
    Response.success(res, AdminSuccess.sectorCreated(), sector);
  } catch (error) {
    if (error instanceof CustomError) return Response.withError(res, error);

    Response.withError(res, CommonError.serverError);
  }
};

exports.getSectors = async (req, res) => {
  try {
    const sectors = await SectorService.getSectorsService();
    Response.success(res, AdminSuccess.sectorsListed(), sectors);
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);

    Response.withError(res, CommonError.serverError);
  }
};

exports.updateSector = async (req, res) => {
  const _id = req.params.sectorId;
  console.log("Sektör id", _id);
  const { updatedSectorName } = req.body;
  try {
    const sector = await SectorService.updateSectorService(_id, updatedSectorName);

    Response.success(res, AdminSuccess.sectorUpdated(), sector);
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);
    if (error instanceof CastError) {
      error.message = "Güncellenmek istenen sektör id hatalı";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
  }
};

exports.deleteSector = async (req, res) => {
  const _id = req.params.sectorId;
  try {
    const sector = await SectorService.deleteSectorService(_id);

    Response.success(res, AdminSuccess.sectorDeleted(), sector);
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);
    if (error instanceof CastError) {
      error.message = "Güncellenmek istenen sektör id hatalı";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};

exports.createBusinessType = async (req, res) => {
  const { sector, businessTypeName } = req.body;
  // TODO If there exist a businessType in DB, it will be checked (case-insensetive)
  // BusinessType model add collation as in Sector Model
  try {
    const businessType = await BusinessTypeService
      .createBusinessTypeService(sector, businessTypeName);
    Response.success(res, AdminSuccess.businessTypeCreated(), businessType);
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);

    if (error instanceof CastError) {
      error.message = "Güncellenmek istenen sektör id hatalı";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};

exports.getBusinessTypesBySector = async (req, res) => {
  const _id = req.params.sectorId;
  try {
    const businessTypeList = await BusinessTypeService.getBusinessTypeBySectorService(_id);

    Response.success(
      res,
      AdminSuccess.businessTypeListed(),
      { businessTypeList }
    );
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);

    if (error instanceof CastError) {
      error.message = "İş tipleri listelenemedi çünkü sektör id değeri hatalı";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};

exports.updateBusinessType = async (req, res) => {
  const _id = req.params.businessTypeId;
  console.log("BusinessType id: ", _id);
  const {
    updatedBusinessTypeName,
    updatedSector
  } = req.body;
  try {
    const businessType = await BusinessTypeService
      .updateBusinessTypeService(_id, updatedBusinessTypeName, updatedSector);

    Response.success(
      res,
      AdminSuccess.businessTypeUpdated(),
      { businessType }
    );
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);

    if (error instanceof CastError) {
      error.message = "Güncellenmek istenen iş tipinin id değeri hatalı";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};

exports.deleteBusinessType = async (req, res) => {
  const _id = req.params.businessTypeId;
  console.log("businesstype id => ", _id);
  try {
    const businessType = await BusinessTypeService.deleteBusinessTypeService(_id);

    Response.success(
      res,
      AdminSuccess.businessTypeDeleted(),
      { businessType }
    );
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};
