const Sector = require("../models/Sector");
const BusinessType = require("../models/BusinessType");
const Service = require("../models/Service");
const Response = require("../helpers/response");
const AdminError = require("../errors/AdminError");
const CommonError = require("../errors/CommonError");

exports.createSector = (req, res) => {
  const sectorName = req.body.sectorName;
  const sector = new Sector({
    sectorName
  });
  sector
    .save()
    .then(() => {
      res.status(201).json({
        message: "Sektör başarıyla oluşturuldu",
        sector
      });
    })
    .catch(err => console.log(err));
};

exports.createBusinessType = (req, res) => {
  const businessTypeName = req.body.businessTypeName;
  const sector = req.body.sectorID;
  console.log("bağlancak sectorID:", sector);
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
        "İşyeri tipi başarıyla oluşturuldu",
        businessType
      );
    })
    .catch(err => Response.withError(res, err));
};

exports.createService = (req, res) => {
  const serviceName = req.body.serviceName;
  const businessTypeID = req.body.businessTypeID;

  console.log("service name => ", serviceName);

  const service = new Service({
    serviceName,
    businessType: businessTypeID
  });

  service
    .save()
    .then(() => {
      res.status(201).json({
        message: "Servis oluşturuldu",
        service
      });
    })
    .catch(err => Response.withError(res, err));
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
