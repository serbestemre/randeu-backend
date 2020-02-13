const express = require("express");

const Business = require("../models/Business");

exports.createBusiness = (req, res) => {
  const businessName = req.body.businessName;
  const address = req.body.address;
  const sector = req.body.sector;
  const businessType = req.body.businessType;
  const businessOwner = req.body.businessOwner;
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
