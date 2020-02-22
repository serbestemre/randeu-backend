const ValidationError = require("mongoose").Error.ValidationError;
const CastError = require("mongoose").Error.CastError;

const Sector = require("../models/Sector");
const BusinessType = require("../models/BusinessType");
const Service = require("../models/Service");
const Response = require("../helpers/response");
const AdminError = require("../errors/AdminError");
const CommonError = require("../errors/CommonError");

exports.createService = async (req, res) => {
  const { serviceName, businessType } = req.body;

  console.log("service name => ", serviceName);
  try {
    const service = await Service.findOne({ serviceName });
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

exports.updateService = async (req, res) => {
  const { foundServiceId, updatedServiceName, updatedBusinessType } = req.body;
  try {
    const service = await Service.findById(foundServiceId);
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
    const foundService = await Service.findById(serviceId);
    if (!foundService)
      return Response.withError(res, AdminError.serviceNotFound());

    await Service.deleteOne(foundService);
    Response.success(res, 200, { foundService }, "Servis başarıyla silindi");
  } catch (error) {
    Response.withError(res, CommonError.serverError());
  }
};

exports.createSector = async (req, res) => {
  const sectorName = req.body.sectorName;
  try {
    const sector = await Sector.findOne({ sectorName });
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
    const sectors = await Sector.find();
    Response.success(res, 200, sectors, "Sektörler başarıyla listelendi");
  } catch (error) {
    Response.withError(res, CommonError.serverError);
  }
};

exports.updateSector = async (req, res) => {
  const { updatedSectorId, updatedSectorName } = req.body;
  try {
    const sector = await Sector.findById(updatedSectorId);
    if (!sector) return Response.withError(res, AdminError.sectorNotFound());
    if (sector.sectorName === updatedSectorName)
      return Response.withError(res, AdminError.sectorAlreadyExist());

    sector.sectorName = updatedSectorName;
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
    const foundSector = await Sector.findById(sectorId);
    if (!foundSector)
      return Response.withError(res, AdminError.sectorNotFound());

    await Sector.deleteOne(foundSector);
    Response.success(res, 200, { foundSector }, "Sektör başarıyla silindi");
  } catch (error) {
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};

exports.createBusinessType = async (req, res) => {
  const { businessTypeName, sectorId } = req.body;
  console.log("bağlancak sectorID:", sectorId);
  try {
    const sector = await Sector.findById(sectorId);
    if (!sector) return Response.withError(res, AdminError.sectorNotFound());

    const newBusinessType = new BusinessType({
      businessTypeName,
      sectorId
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
    const businessTypeList = await BusinessType.find({ sector: sectorId });
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
    const businessType = await BusinessType.findById(updatingBusinessTypeId);

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
    const foundBusinessType = await BusinessType.findById(businessTypeId);
    if (!foundBusinessType)
      return Response.withError(res, AdminError.businessTypeCouldnotFound());

    await BusinessType.deleteOne(foundBusinessType);
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
