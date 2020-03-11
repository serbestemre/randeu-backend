const Business = require('../models/Business');

exports.findBusinessByIdDB = async businessId => Business.findById(businessId);

exports.deleteOneDB = async business => Business.deleteOne(business);

exports.updateServiceListDB = async (_id, serviceList) => {
  Business.updateOne({ _id }, { $set: { serviceList } });
};
