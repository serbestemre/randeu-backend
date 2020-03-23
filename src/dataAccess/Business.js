const Business = require("../models/Business");

exports.findBusinessByIdDB = async businessId => Business.findById(businessId);

exports.deleteOneDB = async business => Business.deleteOne(business);

exports.updateServiceListDB = async (_id, serviceList) => {
  Business.updateOne({ _id }, { $set: { serviceList } });
};

// TODO Refactor this method with mongoose insert() query
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

exports.updateOneBusinessDB = async (business, updatedBusinessName, updatedAddress,
  updatedSector, updatedBusinessType, updatedBusinessOwner) => {
  business.businessName = updatedBusinessName;
  business.address = updatedAddress;
  business.sector = updatedSector;
  business.businessType = updatedBusinessType;
  business.businessOwner = updatedBusinessOwner;

  return business.save();
};
