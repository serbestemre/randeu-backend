const ValidationError = require("mongoose").Error.ValidationError;
const CastError = require("mongoose").Error.CastError;
const mongoose = require("mongoose");

const User = require("../models/User");
const Business = require("../models/Business");
const Service = require("../models/Service");
const Sector = require("../models/Sector");
const BusinessType = require("../models/BusinessType");
const Response = require("../helpers/response");
const CommonError = require("../errors/CommonError");
const BusinessError = require("../errors/BusinessError");
const AdminError = require("../errors/AdminError");

exports.createBusiness = async (req, res) => {
  try {
    const {
      businessName,
      address,
      sector,
      businessType,
      businessOwner
    } = req.body;
    // const employee = req.body.employeeList[0].employee;

    const doesSectorExist = await Sector.findById(sector);
    if (!doesSectorExist)
      return Response.withError(res, BusinessError.sectorCouldnotFound());

    const doesBusinessTypeExist = await BusinessType.findById(businessType);
    if (!doesBusinessTypeExist)
      return Response.withError(res, BusinessError.businessTypeCouldnotFound());

    const newBusiness = new Business({
      businessName,
      address,
      sector,
      businessType,
      businessOwner
    });

    // Find the businessOwner from users collection and grant his role as BusinessOwner

    const result = await newBusiness.save();
    Response.success(res, 201, result, "Yeni iş yeri oluşturuldu.");
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "İş yeri oluşturulamadı!";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
  }
};

exports.updateBusiness = async (req, res) => {
  const {
    updatingBusiness,
    updatedBusinessName,
    updatedAddress,
    updatedSector,
    updatedBusinessType,
    updatedBusinessOwner
  } = req.body;

  const { userId } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) return Response.withError(res, BusinessError.notAllowedUser());

    // TODO Update isteği oluşturan user bu iş yerinin businessOwner'ı mı kontrol et?

    const doesSectorExist = await Sector.findById(updatedSector);
    if (!doesSectorExist)
      return Response.withError(res, BusinessError.sectorCouldnotFound());

    const doesBusinessTypeExist = await BusinessType.findById(
      updatedBusinessType
    );
    if (!doesBusinessTypeExist)
      return Response.withError(res, BusinessError.businessTypeCouldnotFound());

    const business = await Business.findById(updatingBusiness);

    business.businessName = updatedBusinessName;
    business.address = updatedAddress;
    business.sector = updatedSector;
    business.businessType = updatedBusinessType;
    business.businessOwner = updatedBusinessOwner;

    const result = await business.save();

    Response.success(res, 200, result, "İş yeri başarıyla güncellendi.");
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "İş yeri oluşturulamadı!";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
  }
};

exports.deleteBusiness = async (req, res) => {
  const businessId = req.body.businessId;
  try {
    const business = await Business.findById(businessId);
    console.log(business);

    if (!business)
      return Response.withError(res, BusinessError.businessCouldnotFound());

    await Business.deleteOne(business);
    Response.success(res, 200, business, "İş yeri başarılya silindi.");
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "Silinmek istenen iş yeri id değeri hatalı";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};

exports.addService = async (req, res) => {
  const { serviceId, business } = req.body;
  try {
    const foundService = await Service.findById(serviceId);
    const foundBusiness = await Business.findById(business);
    const businessTypeId = mongoose.Types.ObjectId(foundBusiness.businessType);
    const serviceBusinessType = mongoose.Types.ObjectId(
      foundService.businessType
    );

    if (!foundService)
      return Response.withError(res, AdminError.serviceNotFound());

    if (!serviceBusinessType.equals(businessTypeId))
      return Response.withError(res, BusinessError.BusinessTypesNotMatch());

    if (
      foundBusiness.serviceList.some(
        service => service._id.toString() === foundService._id.toString()
      )
    )
      return Response.withError(res, BusinessError.ServiceAlreadyExist());

    foundBusiness.serviceList.push(foundService);
    foundBusiness.save();
    Response.success(res, 200, foundService, "Servis başarıyla tanımlandı.");
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "İş yeri oluşturulamadı!";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
    console.log(error);
  }
};
