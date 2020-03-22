const ValidationError = require("mongoose").Error.ValidationError;
const CastError = require("mongoose").Error.CastError;

const BusinessTypeDataAccess = require("../dataAccess/BusinessType");
const BusinessSuccess = require("../successes/BusinessSuccess");
const BusinessDataAccess = require("../dataAccess/Business");
const ServiceDataAccess = require("../dataAccess/Service");
const BusinessError = require("../errors/BusinessError");
const SectorDataAccess = require("../dataAccess/Sector");
const BusinessType = require("../models/BusinessType");
const CommonError = require("../errors/CommonError");
const UserDataAccess = require("../dataAccess/User");
const AdminError = require("../errors/AdminError");
const AuthError = require("../errors/AuthError");
const Response = require("../helpers/response");
const Business = require("../models/Business");
const Constants = require("../constants");

// TODO Check requester userId ===? businessOwnerId/EmployeeId

exports.createBusiness = async (req, res) => {
  try {
    const {
      businessName,
      address,
      sector,
      businessType,
      businessOwnerId
    } = req.body;

    const businessOwner = await UserDataAccess.findUserByIdDB(businessOwnerId);

    if (!businessOwner)
      return Response.withError(res, BusinessError.businessOwnerNotFound());

    const doesSectorExist = await SectorDataAccess.findSectorByIdDB(sector);
    if (!doesSectorExist)
      return Response.withError(res, BusinessError.sectorNotFound());

    const doesBusinessTypeExist = await BusinessTypeDataAccess.findBusinessTypeByIdDB(
      businessType
    );
    if (!doesBusinessTypeExist)
      return Response.withError(res, BusinessError.businessTypeNotFound());

    // TODO String fields should be trim
    const newBusiness = new Business({
      businessName,
      address,
      sector,
      businessType
    });

    newBusiness.businessOwnerList.push(businessOwner);
    newBusiness.employeeList.push(businessOwner);

    if (!businessOwner.roles.includes(Constants.ROLES.EMPLOYEE))
      businessOwner.roles.push(Constants.ROLES.EMPLOYEE);

    if (!businessOwner.roles.includes(Constants.ROLES.BUSINESS_OWNER))
      businessOwner.roles.push(Constants.ROLES.BUSINESS_OWNER);

    console.log(businessOwner.roles);

    await UserDataAccess.updateUserRolesDB(
      businessOwnerId,
      businessOwner.roles
    );

    const result = await newBusiness.save();
    Response.success(
      res,
      BusinessSuccess.businessCreated(),
      result
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "İş yeri oluşturulamadı!";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    console.log("create business error: ", error);
    Response.withError(res, CommonError.serverError());
  }
};

exports.updateBusiness = async (req, res) => {
  const {
    updatingBusiness,
    updatedBusinessName,
    updatedAddress,
    updatedSector,
    updatedBusinessType,
    updatedBusinessOwner
  } = req.body;

  const { userId } = req.body;
  try {
    const user = await UserDataAccess.findUserByIdDB(userId);

    if (!user) return Response.withError(res, BusinessError.notAllowedUser());

    // TODO Update isteği oluşturan user bu iş yerinin businessOwner'ı mı kontrol et?

    const doesSectorExist = await SectorDataAccess.findSectorByIdDB(
      updatedSector
    );
    if (!doesSectorExist)
      return Response.withError(res, BusinessError.sectorNotFound());

    const doesBusinessTypeExist = await BusinessType.findById(
      updatedBusinessType
    );
    if (!doesBusinessTypeExist)
      return Response.withError(res, BusinessError.businessTypeNotFound());

    const business = await BusinessDataAccess.findBusinessByIdDB(
      updatingBusiness
    );

    business.businessName = updatedBusinessName;
    business.address = updatedAddress;
    business.sector = updatedSector;
    business.businessType = updatedBusinessType;
    business.businessOwner = updatedBusinessOwner;

    const result = await business.save();

    Response.success(
      res,
      BusinessSuccess.updatedBusiness(),
      result
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "İş yeri Güncellenemedi!";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
  }
};

exports.profile = async (req, res) => {
  const { businessId } = req.body;

  try {
    const business = await BusinessDataAccess.findBusinessByIdDB(businessId);

    if (!business)
      return Response.withError(res, BusinessError.businessNotFound());

    Response.success(
      res,
      BusinessSuccess.businessListed(),
      business
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "Görüntülenmek istenen iş yeri id değeri hatalı. "
        + "Lütfen iş yeri Id değerlerini doğru giriniz.";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};

exports.deleteBusiness = async (req, res) => {
  const businessId = req.body.businessId;
  try {
    const business = await BusinessDataAccess.findBusinessByIdDB(businessId);
    console.log(business);

    if (!business)
      return Response.withError(res, BusinessError.businessNotFound());

    await BusinessDataAccess.deleteOneDB(business);

    Response.success(
      res,
      BusinessSuccess.businessDeleted(),
      business
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "Silinmek istenen iş yeri id değeri hatalı. "
        + "Lütfen servis/iş yeri Id değerlerini doğru giriniz.";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};

exports.hireEmployee = async (req, res) => {
  const { userId, businessId } = req.body;
  try {
    const business = await BusinessDataAccess.findBusinessByIdDB(businessId);
    const user = await UserDataAccess.findUserByIdDB(userId);

    if (!business)
      return Response.withError(res, BusinessError.businessNotFound());

    if (!user) return Response.withError(res, AuthError.userNotFound());

    const isEmployed = business.employeeList.find(
      emp => emp._id.toString() === userId
    );

    if (isEmployed)
      return Response.withError(res, BusinessError.employeeAlreadyExists());

    if (!user.roles.includes(Constants.ROLES.EMPLOYEE))
      user.roles.push(Constants.ROLES.EMPLOYEE);

    UserDataAccess.updateUserRolesDB(userId, user.roles);
    business.employeeList.push(user);
    business.save();
    Response.success(
      res,
      BusinessSuccess.hiredEmployee(),
      {
        user,
        business
      }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "Çalışan, iş yerine başarıyla tanımlanamadı!"
        + "Lütfen Çalışan/İş yeri Id değerlerini doğru giriniz.";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
    console.log(error);
  }
};

exports.dischargeEmployee = async (req, res) => {
  const { userId, businessId } = req.body;
  try {
    const business = await BusinessDataAccess.findBusinessByIdDB(businessId);
    const user = await UserDataAccess.findUserByIdDB(userId);

    if (!business)
      return Response.withError(res, BusinessError.businessNotFound());

    if (!user) return Response.withError(res, AuthError.userNotFound());

    const isEmployed = business.employeeList.find(
      emp => emp._id.toString() === userId
    );

    if (!isEmployed)
      return Response.withError(res, BusinessError.employeeNotFound());

    user.roles.remove(Constants.ROLES.EMPLOYEE);

    business.employeeList.remove(user);
    business.save();

    await UserDataAccess.updateUserRolesDB(userId, user.roles);

    Response.success(
      res,
      BusinessSuccess.dischargedEmployee(),
      {
        user,
        business
      }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "Çalışan belirtilen iş yerinin çalışan listesinden çıkartılamadı!"
        + "Lütfen Çalışan ve İş yeri Id değerlerini doğru giriniz!";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
    console.log(error);
  }
};

exports.assignService = async (req, res) => {
  const {
    serviceId, employeeId, businessId, price, duration
  } = req.body;

  try {
    const business = await BusinessDataAccess.findBusinessByIdDB(businessId);

    if (!business)
      return Response.withError(res, BusinessError.businessNotFound());

    const service = await ServiceDataAccess.findServiceByIdDB(serviceId);

    const foundEmployee = business.employeeList.find(
      emp => emp._id.toString() === employeeId.toString()
    );

    // Servisin tanımlanmak istendiği çalışan bu iş yerinde çalışıyor mu?
    if (!foundEmployee)
      return Response.withError(res, BusinessError.employeeNotFound());

    // Bu iş tipi belirtilen çalışan için daha önceden tanımlanmış mı?
    const doesServiceProviding = foundEmployee.providingServices.find(
      providignService =>
        providignService.service.toString() === serviceId.toString()
    );

    if (doesServiceProviding)
      return Response.withError(res, BusinessError.serviceAlreadyProviding());

    foundEmployee.providingServices.push({
      service: service._id,
      price,
      duration
    });
    await business.save();
    Response.success(
      res,
      BusinessSuccess.assignedService(),
      foundEmployee
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      console.log(error);
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "Çalışan için bir servis tanımlanamadı!"
        + " Lütfen çalışan/iş yeri/servis Id bilgilerini kontrol edin";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
    console.log(error);
  }
};

exports.removeService = async (req, res) => {
  const { businessId, employeeId, serviceId } = req.body;
  try {
    const business = await BusinessDataAccess.findBusinessByIdDB(businessId);

    if (!business)
      return Response.withError(res, BusinessError.businessNotFound());

    const employee = business.employeeList.find(
      emp => emp._id.toString() === employeeId
    );

    if (!employee)
      return Response.withError(res, BusinessError.employeeNotFound());

    const doesServiceExist = await ServiceDataAccess.findServiceByIdDB(
      serviceId
    );

    if (!doesServiceExist)
      return Response.withError(res, AdminError.serviceNotFound());

    const removingService = employee.providingServices.find(
      providingService =>
        providingService.service.toString() === serviceId.toString()
    );

    if (!removingService)
      return Response.withError(res, BusinessError.serviceNotProvided());

    employee.providingServices.remove(removingService);
    await business.save();
    Response.success(
      res,
      BusinessSuccess.removedService(),
      business
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message = "Çalışanın servis listesinden silinmek istenen servis silinimedi!"
        + " Lütfen çalışan/iş yeri/servis Id bilgilerini kontrol edin.";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
    console.log(error);
  }
};
