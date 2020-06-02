const CastError = require("mongoose").Error.CastError;

const BusinessTypeService = require("../services/BusinessTypeService");
const ServiceService = require("../services/ServiceService");
const SectorService = require("../services/SectorService");
const AdminSuccess = require("../successes/AdminSuccess");
const CustomError = require("../helpers/CustomError");
const CommonError = require("../errors/CommonError");
const Response = require("../helpers/Response");


// TODO Edit Service Model add sector field and don't forget these steps
// TODO Refactor ==>>> updateService()
// TODO Edit =>>>> ServiceMock add sector fields from the SectorMocks created objects
exports.createService = async (req, res) => {
  const { serviceName, businessType } = req.body;

  console.log("service name => ", serviceName);
  try {
    const service = await ServiceService.createServiceService(serviceName, businessType);
    Response.success(res, AdminSuccess.ServiceCreated(), service);
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);


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
    const serviceList = await ServiceService.getServiceListByBusinessService(_id);
    Response.success(
      res,
      AdminSuccess.ServicesListedByBusiness(),
      serviceList
    );
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);


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
    const service = await ServiceService
      .updateServiceService(_id, updatedServiceName, updatedBusinessType);

    Response.success(
      res,
      AdminSuccess.ServiceUpdated(),
      service
    );
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);


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
    const service = await ServiceService.deleteServiceService(_id);

    Response.success(
      res,
      AdminSuccess.ServiceDeleted(),
      service
    );
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);


    Response.withError(res, CommonError.serverError());
  }
};

exports.createSector = async (req, res) => {
  const sectorName = req.body.sectorName.trim();
  try {
    const sector = await SectorService.createSectorService(sectorName);
    Response.success(res, AdminSuccess.SectorCreated(), sector);
  } catch (error) {
    if (error instanceof CustomError) return Response.withError(res, error);

    Response.withError(res, CommonError.serverError);
  }
};

exports.getSectors = async (req, res) => {
  try {
    const sectors = await SectorService.getSectorsService();
    Response.success(res, AdminSuccess.SectorsListed(), sectors);
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

    Response.success(res, AdminSuccess.SectorUpdated(), sector);
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

    Response.success(res, AdminSuccess.SectorDeleted(), sector);
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
    Response.success(res, AdminSuccess.BusinessTypeCreated(), businessType);
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

exports.getAllServices = async (req, res) => {
  try {
    const servicesList = await ServiceService.getAllServices();

    Response.success(
      res,
      AdminSuccess.ServicesListed(),
      { servicesList }
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

exports.getAllBusinessTypes = async (req, res) => {
  try {
    const businessTypesList = await BusinessTypeService.getAllBusinessTypes();

    Response.success(
      res,
      AdminSuccess.BusinessTypesListed(),
      { businessTypesList }
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


exports.getBusinessTypesBySector = async (req, res) => {
  const _id = req.params.sectorId;
  try {
    const businessTypeList = await BusinessTypeService.getBusinessTypeBySectorService(_id);

    Response.success(
      res,
      AdminSuccess.BusinessTypeListed(),
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
      AdminSuccess.BusinessTypeUpdated(),
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
      AdminSuccess.BusinessTypeDeleted(),
      { businessType }
    );
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);


    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};
