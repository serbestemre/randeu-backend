const BusinessType = require("../models/BusinessType");

exports.findBusinessTypeDB = async sector => BusinessType.find({ sector });

exports.findBusinessTypeByIdDB = async businessTypeId => BusinessType.findById(businessTypeId);

exports.deleteBusinessTypeDB = async businessType => BusinessType.deleteOne(businessType);
