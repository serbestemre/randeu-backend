const ValidationError = require('mongoose').Error.ValidationError;
const CastError = require('mongoose').Error.CastError;

const Sector = require('../models/Sector');
const BusinessType = require('../models/BusinessType');
const Service = require('../models/Service');
const Response = require('../helpers/response');
const AdminError = require('../errors/AdminError');
const CommonError = require('../errors/CommonError');

exports.createService = async (req, res) => {
  const serviceName = req.body.serviceName;
  const businessTypeID = req.body.businessTypeID;

  console.log('service name => ', serviceName);
  try {
    const service = await Service.findOne({ serviceName });
    if (service)
      return Response.withError(res, AdminError.serviceAlreadyExist());

    const newService = new Service({
      serviceName,
      businessTypeID
    });

    const result = await newService.save();
    Response.success(res, 201, result, 'Servis oluşturuldu!');
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = 'İşyeri tipleri listelenemedi!';
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
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
    Response.success(res, 201, result, 'Sektör oluşturuldu!');
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError);
  }
};

exports.createBusinessType = (req, res) => {
  const businessTypeName = req.body.businessTypeName;
  const sector = req.body.sectorID;
  console.log('bağlancak sectorID:', sector);
  const businessType = new BusinessType({
    businessTypeName,
    sector: req.body.sectorID
  });
  businessType
    .save()
    .then(() => {
      Response.success(
        res,
        201,
        'İşyeri tipi başarıyla oluşturuldu',
        businessType
      );
    })
    .catch(err => Response.withError(res, err));
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
      'İş tipi listesi başarıyla oluşturuldu'
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = 'İş tipleri listelenemedi çünkü sektör id değeri hatalı';
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
      'İş tipi başarıyla Güncellendi'
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = 'Güncellenmek istenen iş tipinin id değeri hatalı';
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};

exports.deleteBusinessType = async (req, res) => {
  const { businessTypeId } = req.body;
  console.log('businesstype id => ', businessTypeId);
  try {
    const foundBusinessType = await BusinessType.findById(businessTypeId);
    if (!foundBusinessType)
      return Response.withError(res, AdminError.businessTypeCouldnotFound());

    await BusinessType.deleteOne(foundBusinessType);
    Response.success(
      res,
      200,
      { foundBusinessType },
      'İş tipi başarıyla silindi'
    );
  } catch (error) {
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};
