const ValidationError = require("mongoose").Error.ValidationError;
const CastError = require("mongoose").Error.CastError;

const Sector = require("../models/Sector");
const BusinessType = require("../models/BusinessType");
const Service = require("../models/Service");
const Response = require("../helpers/response");
const AdminError = require("../errors/AdminError");
const CommonError = require("../errors/CommonError");
const ServiceDataAccess = require("../dataAccess/Service");
const SectorDataAccess = require("../dataAccess/Sector");
const BusinessTypeDataAccess = require("../dataAccess/BusinessType");

exports.createService = async (req, res) => {
  const { serviceName, businessType } = req.body;

  console.log("service name => ", serviceName);
  try {
    const service = await ServiceDataAccess.getServiceDB({ serviceName });
    if (service)
      return Response.withError(res, AdminError.serviceAlreadyExist());

    const newService = new Service({
      serviceName,
      businessType
    });

    const result = await newService.save();
    Response.success(res, 201, result, "Servis oluşturuldu!");
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
  const { businessType } = req.body;
  try {
    const serviceList = await ServiceDataAccess.getServiceListDB({
      businessType
    });
    if (!serviceList)
      return Response.withError(res, AdminError.noServiceListByGivenBusiness);

    Response.success(res, 200, { serviceList }, "Servis listesi yüklendi");
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      // eslint-disable-next-line operator-linebreak
      error.message =
        "Servis listesi yüklenemedi çünkü iş tipi id değeri hatalı";
      Object.asssign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
  }
};

exports.updateService = async (req, res) => {
  const { foundServiceId, updatedServiceName, updatedBusinessType } = req.body;
  try {
    const service = await ServiceDataAccess.getServiceById({ foundServiceId });
    if (!service) return Response.withError(res, AdminError.serviceNotFound());
    if (service.serviceName === updatedServiceName)
      return Response.withError(res, AdminError.serviceAlreadyExist());

    service.serviceName = updatedServiceName;
    service.businessType = updatedBusinessType;
    const result = await service.save();
    Response.success(res, 201, result, "Service başarıyla güncellendi");
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
  const { serviceId } = req.body;
  try {
    const foundService = await ServiceDataAccess.getServiceById({ serviceId });
    if (!foundService)
      return Response.withError(res, AdminError.serviceNotFound());

    await ServiceDataAccess.deleteService({ foundService });

    Response.success(res, 200, { foundService }, "Servis başarıyla silindi");
  } catch (error) {
    Response.withError(res, CommonError.serverError());
  }
};

exports.createSector = async (req, res) => {
  const sectorName = req.body.sectorName.trim();
  try {
    const sector = await SectorDataAccess.findSectorByNameDB({ sectorName });
    if (sector) return Response.withError(res, AdminError.sectorAlreadyExist());
    const newSector = new Sector({
      sectorName
    });
    const result = await newSector.save();
    Response.success(res, 201, result, "Sektör oluşturuldu!");
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError);
  }
};

exports.getSectors = async (req, res) => {
  try {
    const sectors = await SectorDataAccess.findSectorsDB();
    Response.success(res, 200, sectors, "Sektörler başarıyla listelendi");
  } catch (error) {
    Response.withError(res, CommonError.serverError);
  }
};

exports.updateSector = async (req, res) => {
  const { updatedSectorId, updatedSectorName } = req.body;
  try {
    const sector = await SectorDataAccess.findSectorByIdDB(updatedSectorId);
    if (!sector) return Response.withError(res, AdminError.sectorNotFound());
    if (sector.sectorName === updatedSectorName)
      return Response.withError(res, AdminError.sectorAlreadyExist());

    sector.sectorName = updatedSectorName.trim();
    const result = await sector.save();
    Response.success(res, 201, result, "Sektör başarıyla güncellendi");
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "Güncellenmek istenen sektör id hatalı";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
  }
};

exports.deleteSector = async (req, res) => {
  const { sectorId } = req.body;
  try {
    const foundSector = await SectorDataAccess.findSectorByIdDB(sectorId);
    if (!foundSector)
      return Response.withError(res, AdminError.sectorNotFound());

    await SectorDataAccess.deleteSectorByIdDB(foundSector);
    Response.success(res, 200, { foundSector }, "Sektör başarıyla silindi");
  } catch (error) {
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};

exports.createBusinessType = async (req, res) => {
  const { businessTypeName, sector } = req.body;
  // TODO If there exist a businessType in DB, it will be checked (case-insensetive)
  // BusinessType model add collation as in Sector Model
  try {
    const foundSector = await SectorDataAccess.findSectorByIdDB(sector);
    if (!foundSector) return Response.withError(res, AdminError.sectorNotFound());

    const newBusinessType = new BusinessType({
      businessTypeName,
      sector
    });
    const result = await newBusinessType.save();
    Response.success(res, 201, result, "İşyeri tipi oluşturuldu");
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "Sektörler listelenemedi!";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
  }
};

exports.getBusinessTypesBySector = async (req, res) => {
  const { sectorId } = req.body;

  try {
    const businessTypeList = await BusinessTypeDataAccess.findBusinessTypeByIdDB(sectorId);
    if (!businessTypeList)
      return Response.withError(res, AdminError.noBusinessTypeByGivenSector());


    Response.success(
      res,
      200,
      { businessTypeList },
      "İş tipi listesi başarıyla oluşturuldu"
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
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
  const {
    updatingBusinessTypeId,
    uptadedValueBusinessTypeName,
    uptadedValueSector
  } = req.body;
  try {
    const businessType = await BusinessTypeDataAccess.findBusinessTypeByIdDB(
      updatingBusinessTypeId
    );
    if (!businessType)
      return Response.withError(res, AdminError.businessTypeCouldnotFound());


    if (businessType.businessTypeName === uptadedValueBusinessTypeName)
      return Response.withError(res, AdminError.businessAlreadyExist());


    businessType.businessTypeName = uptadedValueBusinessTypeName;
    businessType.sector = uptadedValueSector;

    await businessType.save();
    Response.success(
      res,
      200,
      { businessType },
      "İş tipi başarıyla Güncellendi"
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
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
  const { businessTypeId } = req.body;
  console.log("businesstype id => ", businessTypeId);
  try {
    const foundBusinessType = await BusinessTypeDataAccess.findBusinessTypeByIdDB({
      businessTypeId
    });

    if (!foundBusinessType)
      return Response.withError(res, AdminError.businessTypeCouldnotFound());


    await BusinessTypeDataAccess.deleteBusinessTypeDB({ foundBusinessType });
    Response.success(
      res,
      200,
      { foundBusinessType },
      "İş tipi başarıyla silindi"
    );
  } catch (error) {
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};
