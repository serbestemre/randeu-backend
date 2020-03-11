const Business = require('../models/Business');

exports.findBusinessByIdDB = async businessId => Business.findById(businessId).lean();

exports.deleteOneDB = async business => Business.deleteOne(business);

exports.updateServiceListDB = async (_id, serviceList) => {
  Business.updateOne({ _id }, { $set: { serviceList } });
};

exports.updateProvidingServicesListDB = async (_id, service) => {
  Business.updateOne({ _id }, { $push: { 'employeeList.providingServices': service } });
};
