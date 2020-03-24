const BusinessType = require("../models/BusinessType");


exports.findBusinessTypeDB = async sector => BusinessType.find({ sector });

exports.findBusinessTypeByIdDB = async searchedBusinessType =>
  BusinessType.findById(searchedBusinessType);

exports.deleteBusinessTypeDB = async foundBusinessType =>
  BusinessType.deleteOne(foundBusinessType);

exports.deleteManyBusinessTypesDB = async () =>
  BusinessType.deleteMany();

exports.insertManyBusinessTypesDB = async businessTypes =>
  BusinessType.insertMany(businessTypes);


// TODO Rename this method name as insertOneBusinessTypeDB
// TODO Refactor this method as mongoose create() query
//  look for example dataAccess/business => insertOneBusinessDB()
exports.createBusinessType = async (businessTypeName, sector) => {
  const newBusinessType = new BusinessType({
    businessTypeName,
    sector
  });
  return newBusinessType.save();
};
