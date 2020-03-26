const mongoose = require("mongoose");

const BusinessDatabaseAccess = require("../../src/dataAccess/Business");
const BusinessTypeMock = require("./BusinessTypeMock");
const Business = require("../../src/models/Business");
const ServiceMock = require("./ServiceMock");
const SectorMock = require("./SectorMock");
const UserMock = require("./UserMock");

const businessKuaforId = new mongoose.Types.ObjectId();
const businessKuafor = new Business({
  _id: businessKuaforId,
  businessName: "Örnek Kuaför İş Yeri",
  address: "Adres Bilgisi",
  sector: SectorMock.sectorPersonalCare._id,
  businessType: BusinessTypeMock.businessTypeKuafor._id,
  businessOwnerList: [UserMock.businessOwnerKuafor._id],
  employeeList: [
    {
      employee: UserMock.businessOwnerKuafor._id,
      providingServices: [
        { service: ServiceMock.serviceSacKesim._id, price: 30, duration: 30 },
        { service: ServiceMock.serviceSacBoyama._id, price: 30, duration: 20 },
        { service: ServiceMock.serviceSakalKesim._id, price: 20, duration: 15 }
      ]
    },
    {
      employee: UserMock.employeeOne._id,
      providingServices: [{ service: ServiceMock.serviceSacKesim, price: 20, duration: 30 }]
    }
  ],
  calendar: [
    {
      day: ["Çarşamba", "Perşembe"],
      opening: new Date("2020-03-26T09:00:00Z"),
      closing: new Date("2020-03-26T12:00:00Z"),
      interval: new Date("2015-03-25T00:15:00Z")
    }

  ]

});

const setupBusinessDB = async () => {
  await BusinessDatabaseAccess.deleteManyBusinessDB();
  await BusinessDatabaseAccess.insertManyBusinessDB(
    [businessKuafor]
  );
};

module.exports = {
  businessKuafor,
  setupBusinessDB
};
