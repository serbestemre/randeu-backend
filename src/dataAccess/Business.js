const Business = require("../models/Business");

exports.insertManyBusinessDB = async businesses =>
  Business.insertMany(businesses);

exports.findBusinessByIdDB = async businessId => Business.findById(businessId);

exports.deleteOneDB = async business => Business.deleteOne(business);

exports.updateServiceListDB = async (_id, serviceList) => {
  Business.updateOne({ _id }, { $set: { serviceList } });
};

exports.getBusinessListDB = async () => Business.find();

exports.insertOneBusinessDB = async (
  businessName, address, sector, businessType, businessOwner) => {
  const resultBusiness = Business.create({
    businessName,
    address,
    sector,
    businessType,
    businessOwnerList: [{ businessOwner: businessOwner._id }],
    employeeList: [{ employee: businessOwner._id }]
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

exports.deleteManyBusinessDB = async () =>
  Business.deleteMany();

// exports.addEmployeeToTheBusinessDB = async (_id, employee) => {
//   Business.updateOne({ _id }, { $push: { 'employeeList.employee': employee._id } });
// };
