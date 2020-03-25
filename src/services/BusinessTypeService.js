const BusinessTypeDataAccess = require("../dataAccess/BusinessType");
const SectorDataAccess = require("../dataAccess/Sector");
const AdminError = require("../errors/AdminError");

exports.createBusinessTypeService = async (sector, businessTypeName) => {
  const searchedSector = await SectorDataAccess.findSectorByIdDB(sector);
  const searchedBusinessTypeName = await BusinessTypeDataAccess
    .findBusinessTypeByNameDB({ businessTypeName });

  if (!searchedSector)
    throw AdminError.SectorNotFound();

  if (searchedBusinessTypeName)
    throw AdminError.BusinessTypeAlreadyExists();

  return BusinessTypeDataAccess.insertOneBusinessTypeDB(searchedSector, businessTypeName);
};

exports.getBusinessTypeBySectorService = async id => {
  const businessTypeList = await BusinessTypeDataAccess.findBusinessTypeDB(id);
  if (!businessTypeList)
    throw AdminError.BusinessTypeNotFoundByGivenSector();

  return businessTypeList;
};

exports.updateBusinessTypeService = async (id, businessTypeName, sector) => {
  const businessType = await BusinessTypeDataAccess.findBusinessTypeByIdDB(id);

  if (!businessType)
    throw AdminError.BusinessTypeNotFound();

  if (businessType.businessTypeName === businessTypeName)
    throw AdminError.BusinessTypeAlreadyExists();

  return BusinessTypeDataAccess.updateOneBusinessTypeDB(businessType, businessTypeName, sector);
};
