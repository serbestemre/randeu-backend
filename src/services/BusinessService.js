const BusinessTypeDataAccess = require("../dataAccess/BusinessType");
const BusinessDataAccess = require("../dataAccess/Business");
const ServiceDataAccess = require("../dataAccess/Service");
const BusinessError = require("../errors/BusinessError");
const SectorDataAccess = require("../dataAccess/Sector");
const BusinessType = require("../models/BusinessType");
const UserDataAccess = require("../dataAccess/User");
const AuthError = require("../errors/AuthError");
const AdminError = require("../errors/AdminError");
const CONSTANTS = require("../constants");
const Email = require("../helpers/Email");

exports.employeeListService = async businessId => {
  const business = await BusinessDataAccess.findBusinessByIdDB(businessId);

  if (!business)
    throw BusinessError.businessNotFound();


  return BusinessDataAccess.findEmployeeListDB(businessId);
};

exports.providingServiceListService = async businessId => {
  const providingServiceList = await
  BusinessDataAccess.fetchProvidingServiceListDB(businessId);

  if (!providingServiceList)
    throw BusinessError.providingServiceListNotFound();

  return providingServiceList;
};

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

  // TODO add user's model of businessOwner ownderBusiness[newBusinessID]

  if (!businessOwner.roles.includes(CONSTANTS.ROLES.EMPLOYEE))
    businessOwner.roles.push(CONSTANTS.ROLES.EMPLOYEE);


  if (!businessOwner.roles.includes(CONSTANTS.ROLES.BUSINESS_OWNER))
    businessOwner.roles.push(CONSTANTS.ROLES.BUSINESS_OWNER);


  await UserDataAccess.updateUserRolesDB(businessOwnerId, businessOwner.roles);

  Email.sendWelcomeEmailToBusiness(businessOwner.email, businessOwner.fullName, businessName);

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


exports.getBusinessList = async () => {
  const businessList = await BusinessDataAccess.getBusinessListDB();

  if (!businessList)
    throw BusinessError.businessListNotListed();


  return businessList;
};

exports.businesslistByBusinessType = async businessTypeName => {
  const businesslist = await BusinessDataAccess.businesslistByBusinessTypeDB(businessTypeName);

  if (!businesslist || businesslist.length === 0)
    throw BusinessError.businesslistNotListedByBusinessType();


  return businesslist;
};

exports.businesslistByService = async serviceName => {
  const businessList = await BusinessDataAccess.businesslistByServiceDB(serviceName);
  if (!businessList || businessList.length === 0)
    throw BusinessError.businesslistNotListedByService();


  return businessList;
};

exports.businesslistByName = async businessName => {
  const businessList = await BusinessDataAccess.businesslistByName(businessName);
  if (!businessList || businessList.length === 0)
    throw BusinessError.businesslistNotListedByName();


  return businessList;
};

exports.hireEmployeeService = async (userId, businessId) => {
  const business = await BusinessDataAccess.findBusinessByIdDB(businessId);
  const user = await UserDataAccess.findUserByIdDB(userId);

  if (!business)
    throw BusinessError.businessNotFound();


  if (!user) throw AuthError.UserNotFound();

  const isEmployed = business.employeeList.find(
    emp => emp._id.toString() === userId
  );

  if (isEmployed)
    throw BusinessError.employeeAlreadyExists();


  if (!user.roles.includes(CONSTANTS.ROLES.EMPLOYEE))
    user.roles.push(CONSTANTS.ROLES.EMPLOYEE);


  await UserDataAccess.updateUserRolesDB(userId, user.roles);

  // TODO Add user's model of employee workingBusiness[businessId]

  // return BusinessDataAccess
  //   .addEmployeeToTheBusinessDB(businessId, user);
  business.employeeList.push({ employee: user._id });
  await business.save();
  return user;
};

exports.dischargeEmployeeService = async (userId, businessId) => {
  const business = await BusinessDataAccess.findBusinessByIdDB(businessId);
  const user = await UserDataAccess.findUserByIdDB(userId);

  if (!business)
    throw BusinessError.businessNotFound();


  if (!user) throw AuthError.UserNotFound();

  const isEmployed = business.employeeList.find(
    emp => emp._id.toString() === userId
  );

  if (!isEmployed)
    throw BusinessError.employeeNotFound();


  user.roles.remove(CONSTANTS.ROLES.EMPLOYEE);
  business.employeeList.remove(user);
  business.save();

  return UserDataAccess.updateUserRolesDB(userId, user.roles);
};

exports.assignService = async (serviceId, employeeId, businessId, price, duration) => {
  const business = await BusinessDataAccess.findBusinessByIdDB(businessId);

  if (!business)
    throw BusinessError.businessNotFound();


  const service = await ServiceDataAccess.findServiceByIdDB(serviceId);

  const foundEmployee = business.employeeList.find(
    obj => obj.employee.toString() === employeeId.toString()
  );

  // Servisin tanımlanmak istendiği çalışan bu iş yerinde çalışıyor mu?
  if (!foundEmployee)
    throw BusinessError.employeeNotFound();


  // Bu iş tipi belirtilen çalışan için daha önceden tanımlanmış mı?
  const doesServiceProviding = foundEmployee.providingServices.find(
    providignService =>
      providignService.service.toString() === serviceId.toString()
  );

  if (doesServiceProviding)
    throw BusinessError.serviceAlreadyProviding();


  foundEmployee.providingServices.push({
    service: service._id,
    price,
    duration
  });
  await business.save();
  return foundEmployee;
};

exports.removeService = async (businessId, employeeId, serviceId) => {
  const business = await BusinessDataAccess.findBusinessByIdDB(businessId);

  if (!business)
    throw BusinessError.businessNotFound();


  const employee = business.employeeList.find(
    emp => emp._id.toString() === employeeId
  );

  if (!employee)
    throw BusinessError.employeeNotFound();


  const doesServiceExist = await ServiceDataAccess.findServiceByIdDB(
    serviceId
  );

  if (!doesServiceExist)
    throw AdminError.serviceNotFound();


  const removingService = employee.providingServices.find(
    providingService =>
      providingService.service.toString() === serviceId.toString()
  );

  if (!removingService)
    throw BusinessError.serviceNotProvided();


  employee.providingServices.remove(removingService);

  return business.save();
};
