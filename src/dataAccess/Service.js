const Service = require("../models/Service");

exports.getServiceDB = async query => Service.findOne(query);
