const SectorDataAccess = require("../dataAccess/Sector");
const BusinessTypeDataAccess = require("../dataAccess/BusinessType");
const BusinessDataAccess = require("../dataAccess/Business");
const BusinessError = require("../errors/BusinessError");
const UserDataAccess = require("../dataAccess/User");
const AdminError = require("../errors/AdminError");
const Business = require("../models/Business");
const CONSTANTS = require("../constants");

exports.createBusinessService = async (
  businessName,
  address,
  sector,
  businessType,
  businessOwnerId
) => {
  const businessOwner = await UserDataAccess.findUserByIdDB(businessOwnerId);

  if (!businessOwner)
    throw BusinessError.businessOwnerNotFound();

  const doesSectorExist = await SectorDataAccess.findSectorByIdDB(sector);
  if (!doesSectorExist)
    throw BusinessError.sectorNotFound();

  const doesBusinessTypeExist = await BusinessTypeDataAccess.findBusinessTypeByIdDB(businessType);

  if (!doesBusinessTypeExist)
    throw BusinessError.businessTypeNotFound();

  const newBusiness = await BusinessDataAccess.insertOneBusinessDB(
    businessName, address, sector, businessType, businessOwner
  );

  if (!businessOwner.roles.includes(CONSTANTS.ROLES.EMPLOYEE))
    businessOwner.roles.push(CONSTANTS.ROLES.EMPLOYEE);

  if (!businessOwner.roles.includes(CONSTANTS.ROLES.BUSINESS_OWNER))
    businessOwner.roles.push(CONSTANTS.ROLES.BUSINESS_OWNER);

  await UserDataAccess.updateUserRolesDB(businessOwnerId, businessOwner.roles);

  return newBusiness;
};
