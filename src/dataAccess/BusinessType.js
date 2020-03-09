const BusinessType = require("../models/BusinessType");

exports.getBusinessTypeDB = async query => BusinessType.find(query);

exports.getBusinessTypeByIdDB = async businessTypeId => BusinessType.findById(businessTypeId);

exports.deleteBusinessTypeDB = async query => BusinessType.deleteOne(query);
