const BusinessType = require("../models/BusinessType");

exports.getBusinessType = async query => BusinessType.find(query);

exports.getBusinessTypeById = async query => BusinessType.findById(query);

exports.deleteBusinessType = async query => BusinessType.deleteOne(query);
