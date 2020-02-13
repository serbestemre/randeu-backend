const Sector = require("../models/Sector");
const BusinessType = require("../models/BusinessType");

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
  console.log("sectorID:", sector);
  const businessType = new BusinessType({
    businessTypeName,
    sector: req.body.sectorID
  });
  businessType
    .save()
    .then(() => {
      res.status(201).json({
        message: "İşyeri tipi başarıyla oluşturuldu",
        businessType
      });
    })
    .catch(err => console.log(err));
};
