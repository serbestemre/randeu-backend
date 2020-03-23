const BusinessType = require("../models/BusinessType");

exports.findBusinessTypeDB = async sector => BusinessType.find({ sector });

exports.findBusinessTypeByIdDB = async searchedBusinessType =>
  BusinessType.findById(searchedBusinessType);

exports.deleteBusinessTypeDB = async foundBusinessType =>
  BusinessType.deleteOne(foundBusinessType);

// TODO Rename this method name as insertOneBusinessTypeDB
exports.createBusinessType = async (businessTypeName, sector) => {
  const newBusinessType = new BusinessType({
    businessTypeName,
    sector
  });
  return newBusinessType.save();
};
