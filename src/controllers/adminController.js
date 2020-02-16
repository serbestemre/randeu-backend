const Sector = require('../models/Sector');
const BusinessType = require('../models/BusinessType');
const Service = require('../models/Service');
const response = require('../helpers/response');

exports.createSector = (req, res) => {
  const sectorName = req.body.sectorName;
  const sector = new Sector({
    sectorName
  });
  sector
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Sektör başarıyla oluşturuldu',
        sector
      });
    })
    .catch(err => console.log(err));
};

exports.createBusinessType = (req, res) => {
  const businessTypeName = req.body.businessTypeName;
  const sector = req.body.sectorID;
  console.log('sectorID:', sector);
  const businessType = new BusinessType({
    businessTypeName,
    sector: req.body.sectorID
  });
  businessType
    .save()
    .then(() => {
      response.success(res, 201, 'İşyeri tipi başarıyla oluşturuldu', businessType);
    })
    .catch(err => response.withError(res, err));
};

exports.createService = (req, res) => {
  const serviceName = req.body.serviceName;
  const businessTypeID = req.body.businessTypeID;

  console.log('service name => ', serviceName);

  const service = new Service({
    serviceName,
    businessType: businessTypeID
  });

  service
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Servis oluşturuldu',
        service
      });
    })
    .catch(err => response.withError(res, err));
};
