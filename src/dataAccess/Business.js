const Business = require("../models/Business");

exports.findBusinessByIdDB = async businessId => Business.findById(businessId);
