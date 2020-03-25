const mongoose = require("mongoose");

const BusinessType = require("../../src/models/BusinessType");
const BusinessTypeDataAccess = require("../../src/dataAccess/BusinessType");
const SectorMock = require("./SectorMock");

const businessTypeKuaforId = new mongoose.Types.ObjectId();
const businessTypeKuafor = new BusinessType({
  _id: businessTypeKuaforId,
  businessTypeName: "Kuaför",
  sector: SectorMock.sectorPersonalCare._id
});

const businessTypeDisHekimiId = new mongoose.Types.ObjectId();
const businessTypeDisHekimi = new BusinessType({
  _id: businessTypeDisHekimiId,
  businessTypeName: "Diş Hekimi",
  sector: SectorMock.sectorHealthCare._id
});


const setupBusinessTypeDB = async () => {
  await BusinessTypeDataAccess.deleteManyBusinessTypesDB();
  await BusinessTypeDataAccess.insertManyBusinessTypesDB(
    [businessTypeKuafor, businessTypeDisHekimi]
  );
};

module.exports = {
  businessTypeKuafor,
  businessTypeDisHekimi,
  setupBusinessTypeDB
};
