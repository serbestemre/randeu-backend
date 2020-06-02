const BusinessType = require("../models/BusinessType");


exports.findBusinessTypeDB = async sector => BusinessType.find({ sector });

exports.findBusinessTypeByIdDB = async searchedBusinessType =>
  BusinessType.findById(searchedBusinessType);

exports.findAllBusinessTypesDB = async () =>
  BusinessType.find();

exports.deleteBusinessTypeDB = async (businessTypeId, businessType) => {
  businessType.deleteOne({ businessTypeId });
  return businessType;
};


exports.insertOneBusinessTypeDB = async (sector, businessTypeName) =>
  BusinessType.create({
    businessTypeName,
    sector
  });

exports.deleteManyBusinessTypesDB = async () =>
  BusinessType.deleteMany();

exports.insertManyBusinessTypesDB = async businessTypes =>
  BusinessType.insertMany(businessTypes);


exports.findBusinessTypeByNameDB = async businessTypeName => BusinessType.findOne(businessTypeName);

exports.updateOneBusinessTypeDB = async (businessType, businessTypeName, sector) => {
  const updatedBusinessType = businessType;
  updatedBusinessType.businessTypeName = businessTypeName;
  updatedBusinessType.sector = sector;
  return updatedBusinessType.save();
};
