const BusinessType = require("../models/BusinessType");

exports.findBusinessTypeDB = async query => BusinessType.find(query);

exports.findBusinessTypeByIdDB = async businessTypeId => BusinessType.findById(businessTypeId);

exports.deleteBusinessTypeDB = async businessType => BusinessType.deleteOne(businessType);
