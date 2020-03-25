const BusinessType = require("../models/BusinessType");

exports.findBusinessTypeDB = async sector => BusinessType.find({ sector });

exports.findBusinessTypeByIdDB = async searchedBusinessType =>
  BusinessType.findById(searchedBusinessType);

exports.deleteBusinessTypeDB = async foundBusinessType =>
  BusinessType.deleteOne(foundBusinessType);

exports.insertOneBusinessTypeDB = async (sector, businessTypeName) =>
  BusinessType.create({
    businessTypeName,
    sector
  });

exports.findBusinessTypeByNameDB = async businessTypeName => BusinessType.findOne(businessTypeName);

exports.updateOneBusinessTypeDB = async (businessType, businessTypeName, sector) => {
  const updatedBusinessType = businessType;
  updatedBusinessType.businessTypeName = businessTypeName;
  updatedBusinessType.sector = sector;
  return updatedBusinessType.save();
};
