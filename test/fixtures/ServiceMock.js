const mongoose = require("mongoose");

const Service = require("../../src/models/Service");
const BusinessTypeMock = require("./BusinessTypeMock");
const ServiceDataAccess = require("../../src/dataAccess/Service");

// 3 Sample Services for >>> Kuafor BusinessType
const serviceSacKesimId = new mongoose.Types.ObjectId();
const serviceSacKesim = new Service({
  _id: serviceSacKesimId,
  serviceName: "Saç Kesim",
  businessType: BusinessTypeMock.businessTypeKuafor._id
});

const serviceSakalKesimId = new mongoose.Types.ObjectId();
const serviceSakalKesim = new Service({
  _id: serviceSakalKesimId,
  serviceName: "Sakal Kesim",
  businessType: BusinessTypeMock.businessTypeKuafor._id
});

const serviceSacBoyamaId = new mongoose.Types.ObjectId();
const serviceSacBoyama = new Service({
  _id: serviceSacBoyamaId,
  serviceName: "Saç Boyama",
  businessType: BusinessTypeMock.businessTypeKuafor._id
});

// 3 Sample Services for >>> Diş Hekimi BusinessType

const serviceDisTemizligiId = new mongoose.Types.ObjectId();
const serviceDisTemizligi = new Service({
  _id: serviceDisTemizligiId,
  serviceName: "Diş Temizliği",
  businessType: BusinessTypeMock.businessTypeDisHekimi._id
});

const serviceDisCekimId = new mongoose.Types.ObjectId();
const serviceDisCekim = new Service({
  _id: serviceDisCekimId,
  serviceName: "Diş Çekim",
  businessType: BusinessTypeMock.businessTypeDisHekimi._id
});

const serviceDisDolguId = new mongoose.Types.ObjectId();
const serviceDisDolgu = new Service({
  _id: serviceDisDolguId,
  serviceName: "Diş Dolgu",
  businessType: BusinessTypeMock.businessTypeDisHekimi._id
});

const setupServiceDB = async () => {
  await ServiceDataAccess.deleteManySectorsDB();
  await ServiceDataAccess.insertManySectorsDB([
    serviceSacKesim,
    serviceSakalKesim,
    serviceSacBoyama,
    serviceDisTemizligi,
    serviceDisCekim,
    serviceDisDolgu
  ]);
};

module.exports = {
  serviceSacKesim,
  serviceSakalKesim,
  serviceSacBoyama,
  serviceDisTemizligi,
  serviceDisCekim,
  serviceDisDolgu,
  setupServiceDB
};
