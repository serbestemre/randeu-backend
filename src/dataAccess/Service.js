const Service = require("../models/Service");

exports.getServiceDB = async query => Service.findOne(query);

exports.getServiceListDB = async query => Service.find(query);

exports.getServiceById = async query => Service.findById(query);

exports.deleteService = async query => Service.deleteOne(query);
