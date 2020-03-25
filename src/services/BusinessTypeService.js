const BusinessTypeDataAccess = require("../dataAccess/BusinessType");
const SectorDataAccess = require("../dataAccess/Sector");
const AdminError = require("../errors/AdminError");

exports.createBusinessTypeService = async (businessTypeName, sector) => {
  const foundSector = await SectorDataAccess.findSectorByIdDB(sector);
  if (!foundSector)
    throw AdminError.SectorNotFound();

  return BusinessTypeDataAccess.insertOneBusinessTypeDB(businessTypeName, sector);
};

exports.getBusinessTypeBySectorService = async id => {
  const businessTypeList = await BusinessTypeDataAccess.findBusinessTypeDB(id);
  if (!businessTypeList)
    throw AdminError.BusinessTypeNotFoundByGivenSector();

  return businessTypeList;
};
