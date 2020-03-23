const Business = require("../models/Business");

exports.findBusinessByIdDB = async businessId => Business.findById(businessId);

exports.deleteOneDB = async business => Business.deleteOne(business);

exports.updateServiceListDB = async (_id, serviceList) => {
  Business.updateOne({ _id }, { $set: { serviceList } });
};

exports.insertOneBusinessDB = async (
  businessName, address, sector, businessType, businessOwner) => {
  const newBusiness = new Business({
    businessName,
    address,
    sector,
    businessType
  });

  newBusiness.businessOwnerList.push(businessOwner);
  newBusiness.employeeList.push(businessOwner);

  return newBusiness.save();
};
