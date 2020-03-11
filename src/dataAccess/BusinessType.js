const BusinessType = require("../models/BusinessType");

exports.findBusinessTypeDB = async sector => BusinessType.find({ sector });

exports.findBusinessTypeByIdDB = async searchedBusinessType =>
  BusinessType.findById(searchedBusinessType);

exports.deleteBusinessTypeDB = async foundBusinessType =>
  BusinessType.deleteOne(foundBusinessType);
