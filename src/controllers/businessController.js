const Business = require("../models/Business");

exports.createBusiness = (req, res) => {
  const {
    businessName,
    address,
    sector,
    businessType,
    businessOwner
  } = req.body;
  // const employee = req.body.employeeList[0].employee;

  const newBusiness = new Business({
    businessName,
    address,
    sector,
    businessType,
    businessOwner
  });

  console.log("newBusiness Obj = ", newBusiness);
  newBusiness
    .save()
    .then(() => {
      res.status(201).json({
        message: "İşyeri başarıyla oluşturuldu.",
        newBusiness
      });
    })
    .catch(err => {
      console.log(err);
    });
};
