const Business = require("../models/Business");

exports.insertManyBusinessDB = async businesses =>
  Business.insertMany(businesses);

exports.findBusinessByIdDB = async businessId =>
  Business.findById(businessId);

exports.deleteOneDB = async business => Business.deleteOne(business);

exports.updateServiceListDB = async (_id, serviceList) => {
  Business.updateOne({ _id }, { $set: { serviceList } });
};

exports.getBusinessListDB = async () => Business.find();

exports.insertOneBusinessDB = async (
  businessName,
  address,
  sector,
  businessType,
  businessOwner
) => {
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
// TODO Case insensetive refactoring
exports.businesslistByName = async businessName => Business.find({ businessName: { $regex: `.*${businessName}*` } });

exports.updateOneBusinessDB = async (
  business,
  updatedBusinessName,
  updatedAddress,
  updatedSector,
  updatedBusinessType,
  updatedBusinessOwner
) => {
  business.businessName = updatedBusinessName;
  business.address = updatedAddress;
  business.sector = updatedSector;
  business.businessType = updatedBusinessType;
  business.businessOwner = updatedBusinessOwner;

  return business.save();
};

exports.deleteManyBusinessDB = async () => Business.deleteMany();

// TODO Optimize and populate the query
// TODO Case insensetive refactoring
exports.businesslistByBusinessTypeDB = async businessTypeName =>
  Business.aggregate([
    {
      $lookup: {
        from: "businesstypes",
        localField: "businessType",
        foreignField: "_id",
        as: "businessTypeName"
      }
    },
    {
      $project: {
        "businessTypeName._id": 0,
        "businessTypeName.sector": 0
      }
    },
    {
      $match: {
        "businessTypeName.businessTypeName": { $in: [businessTypeName] }
      }
    }
  ]);


// TODO Optimize and populate the query
// TODO Case insensetive refactoring
exports.businesslistByServiceDB = async serviceName => Business.aggregate([
  {
    $lookup: {
      from: 'services',
      localField: 'employeeList.providingServices.service',
      foreignField: '_id',
      as: 'providingServices'
    }
  },
  {
    $project: {
      "providingServices._id": 0,
      "providingServices.businessType": 0,
      "providingServices.__v": 0
    }
  },
  {
    $match: {
      "providingServices.serviceName": serviceName
    }
  }
]);
