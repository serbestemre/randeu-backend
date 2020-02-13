const Sector = require("../models/Sector");

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
