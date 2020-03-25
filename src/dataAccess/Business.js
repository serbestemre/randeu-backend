const Business = require("../models/Business");

exports.findBusinessByIdDB = async businessId => Business.findById(businessId);

exports.deleteOneDB = async business => Business.deleteOne(business);

exports.updateServiceListDB = async (_id, serviceList) => {
  Business.updateOne({ _id }, { $set: { serviceList } });
};

exports.insertOneBusinessDB = async (
  businessName, address, sector, businessType, businessOwner) => {
  const resultBusiness = Business.create({
    businessName,
    address,
    sector,
    businessType,
    businessOwnerList: [{ _id: businessOwner._id }],
    employeeList: [{ _id: businessOwner._id }]
  });
  console.log(resultBusiness);
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
