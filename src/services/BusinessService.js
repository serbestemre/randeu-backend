const SectorDataAccess = require("../dataAccess/Sector");
const BusinessTypeDataAccess = require("../dataAccess/BusinessType");
const BusinessDataAccess = require("../dataAccess/Business");
const BusinessError = require("../errors/BusinessError");
const BusinessType = require("../models/BusinessType");
const UserDataAccess = require("../dataAccess/User");
const AuthError = require("../errors/AuthError");
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

exports.updateBusinessService = async (updatingBusiness,
  updatedBusinessName,
  updatedAddress,
  updatedSector,
  updatedBusinessType,
  updatedBusinessOwner,
  userId) => {
  const user = await UserDataAccess.findUserByIdDB(userId);

  if (!user) throw BusinessError.notAllowedUser();

  // TODO Update isteği oluşturan user bu iş yerinin businessOwner'ı mı kontrol et?
  const doesSectorExist = await SectorDataAccess.findSectorByIdDB(
    updatedSector
  );
  if (!doesSectorExist)
    throw BusinessError.sectorNotFound();

  const doesBusinessTypeExist = await BusinessType.findById(
    updatedBusinessType
  );
  if (!doesBusinessTypeExist)
    throw BusinessError.businessTypeNotFound();

  const business = await BusinessDataAccess.findBusinessByIdDB(
    updatingBusiness
  );

  return BusinessDataAccess.updateOneBusinessDB(business, updatedBusinessName,
    updatedAddress,
    updatedSector,
    updatedBusinessType,
    updatedBusinessOwner);
};

exports.deleteBusinessService = async businessId => {
  const business = await BusinessDataAccess.findBusinessByIdDB(businessId);

  if (!business)
    throw BusinessError.businessNotFound();

  return BusinessDataAccess.deleteOneDB(business);
};

exports.profileService = async businessId => {
  const business = await BusinessDataAccess.findBusinessByIdDB(businessId);

  if (!business)
    throw BusinessError.businessNotFound();

  return business;
};

exports.hireEmployeeService = async (userId, businessId) => {
  const business = await BusinessDataAccess.findBusinessByIdDB(businessId);
  const user = await UserDataAccess.findUserByIdDB(userId);

  if (!business)
    throw BusinessError.businessNotFound();

  if (!user) throw AuthError.userNotFound();

  const isEmployed = business.employeeList.find(
    emp => emp._id.toString() === userId
  );

  if (isEmployed)
    throw BusinessError.employeeAlreadyExists();

  if (!user.roles.includes(CONSTANTS.ROLES.EMPLOYEE))
    user.roles.push(CONSTANTS.ROLES.EMPLOYEE);

  await UserDataAccess.updateUserRolesDB(userId, user.roles);

  business.employeeList.push(user);
  await business.save();
  return user;
};
