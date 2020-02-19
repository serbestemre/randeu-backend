const ValidationError = require("mongoose").Error.ValidationError;
const CastError = require("mongoose").Error.CastError;

const Business = require("../models/Business");
const Sector = require("../models/Sector");
const BusinessType = require("../models/BusinessType");
const Response = require("../helpers/response");
const CommonError = require("../errors/CommonError");
const BusinessError = require("../errors/BusinessError");

exports.createBusiness = async (req, res) => {
  try {
    const {
      businessName,
      address,
      sector,
      businessType,
      businessOwner,
      employeeList
    } = req.body;
    // const employee = req.body.employeeList[0].employee;

    const doesSectorExist = await Sector.findById(sector);
    const doesBusinessTypeExist = await BusinessType.findById(businessType);

    if (!doesSectorExist)
      return Response.withError(res, BusinessError.sectorCouldnotFound());

    if (!doesBusinessTypeExist)
      return Response.withError(res, BusinessError.businessTypeCouldnotFound());

    const newBusiness = new Business({
      businessName,
      address,
      sector,
      businessType,
      businessOwner,
      employeeList
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
