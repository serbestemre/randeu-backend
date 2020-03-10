const ValidationError = require("mongoose").Error.ValidationError;
const CastError = require("mongoose").Error.CastError;
const mongoose = require("mongoose");

const Constants = require("../constants");
const User = require("../models/User");
const Business = require("../models/Business");
const Service = require("../models/Service");
const Sector = require("../models/Sector");
const BusinessType = require("../models/BusinessType");
const Response = require("../helpers/response");
const CommonError = require("../errors/CommonError");
const AuthError = require("../errors/AuthError");
const BusinessError = require("../errors/BusinessError");
const AdminError = require("../errors/AdminError");
const BusinessDataAccess = require("../dataAccess/Business");
const UserDataAccess = require("../dataAccess/User");

exports.createBusiness = async (req, res) => {
  try {
    const {
      businessName,
      address,
      sector,
      businessType,
      businessOwnerId
    } = req.body;
    // const employee = req.body.employeeList[0].employee;

    const businessOwner = await UserDataAccess.findUserById(businessOwnerId);

    if (!businessOwner)
      return Response.withError(
        res,
        BusinessError.businessOwnerCouldnotFound()
      );

    const doesSectorExist = await Sector.findById(sector);
    if (!doesSectorExist)
      return Response.withError(res, BusinessError.sectorCouldnotFound());

    const doesBusinessTypeExist = await BusinessType.findById(businessType);
    if (!doesBusinessTypeExist)
      return Response.withError(res, BusinessError.businessTypeCouldnotFound());

    const newBusiness = new Business({
      businessName,
      address,
      sector,
      businessType,
      businessOwner
    });

    newBusiness.employeeList.push(businessOwner);

    if (!businessOwner.roles.includes(Constants.ROLES.EMPLOYEE))
      businessOwner.roles.push(Constants.ROLES.EMPLOYEE);

    if (!businessOwner.roles.includes(Constants.ROLES.BUSINESS_OWNER))
      businessOwner.roles.push(Constants.ROLES.BUSINESS_OWNER);

    console.log(businessOwner.roles);

    await UserDataAccess.updateUserRoles(businessOwnerId, businessOwner.roles);

    const result = await newBusiness.save();
    Response.success(res, 201, result, "Yeni iş yeri oluşturuldu.");
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
    const user = await User.findById(userId);

    if (!user) return Response.withError(res, BusinessError.notAllowedUser());

    // TODO Update isteği oluşturan user bu iş yerinin businessOwner'ı mı kontrol et?

    const doesSectorExist = await Sector.findById(updatedSector);
    if (!doesSectorExist)
      return Response.withError(res, BusinessError.sectorCouldnotFound());

    const doesBusinessTypeExist = await BusinessType.findById(
      updatedBusinessType
    );
    if (!doesBusinessTypeExist)
      return Response.withError(res, BusinessError.businessTypeCouldnotFound());

    const business = await Business.findById(updatingBusiness);

    business.businessName = updatedBusinessName;
    business.address = updatedAddress;
    business.sector = updatedSector;
    business.businessType = updatedBusinessType;
    business.businessOwner = updatedBusinessOwner;

    const result = await business.save();

    Response.success(res, 200, result, "İş yeri başarıyla güncellendi.");
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

exports.deleteBusiness = async (req, res) => {
  const businessId = req.body.businessId;
  try {
    const business = await Business.findById(businessId);
    console.log(business);

    if (!business)
      return Response.withError(res, BusinessError.businessCouldnotFound());

    await Business.deleteOne(business);
    Response.success(res, 200, business, "İş yeri başarılya silindi.");
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message =
        "Silinmek istenen iş yeri id değeri hatalı. " +
        "Lütfen servis/iş yeri Id değerlerini doğru giriniz.";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};

exports.addService = async (req, res) => {
  const { serviceId, businessId } = req.body;
  try {
    const foundService = await Service.findById(serviceId);
    const foundBusiness = await Business.findById(businessId);

    if (!foundService)
      return Response.withError(res, AdminError.serviceNotFound());

    const businessTypeId = mongoose.Types.ObjectId(foundBusiness.businessType);
    const serviceBusinessType = mongoose.Types.ObjectId(
      foundService.businessType
    );

    if (!serviceBusinessType.equals(businessTypeId))
      return Response.withError(res, BusinessError.BusinessTypesNotMatch());

    if (
      foundBusiness.serviceList.some(
        service => service._id.toString() === foundService._id.toString()
      )
    )
      return Response.withError(res, BusinessError.ServiceAlreadyExist());

    foundBusiness.serviceList.push(foundService);
    foundBusiness.save();
    Response.success(res, 200, foundService, "Servis başarıyla tanımlandı.");
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message =
        "Tanımlanmak istenen servis bulunamadı! " +
        "Lütfen Servis Id değerini doğru giriniz.";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
    console.log(error);
  }
};

exports.deleteService = async (req, res) => {
  const { serviceId, businessId } = req.body;
  try {
    const foundBusiness = await Business.findById(businessId);

    if (
      !foundBusiness.serviceList.some(
        service => service._id.toString() === serviceId
      )
    )
      return Response.withError(res, AdminError.serviceNotFound());

    foundBusiness.serviceList.remove(serviceId);
    foundBusiness.save();
    Response.success(res, 200, serviceId, "Servis başarıyla silindi.");
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message =
        "Servis silinemedi. Lütfen silinmek istenen servis/iş yeri" +
        " Id değerlerini doğru giriniz!";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
    console.log(error);
  }
};

exports.hireEmployee = async (req, res) => {
  const { userId, businessId } = req.body;
  try {
    const business = await Business.findById(businessId);
    const user = await User.findById(userId);

    if (!business)
      return Response.withError(res, BusinessError.businessCouldnotFound());

    if (!user) return Response.withError(res, AuthError.UserNotFound());

    if (
      business.employeeList.some(
        employee => employee._id.toString() === user._id.toString()
      )
    )
      return Response.withError(res, BusinessError.employeeAlreadyExist());

    if (!user.roles.includes(Constants.ROLES.EMPLOYEE)) {
      // console.log(role, " !== ", Constants.ROLES.EMPLOYEE);
      user.roles.push(Constants.ROLES.EMPLOYEE);
      user.save();
    }

    business.employeeList.push(user);
    business.save();
    Response.success(
      res,
      200,
      { user, business },
      "Çalışan, iş yerine başarıyla tanımlandı."
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message =
        "Çalışan, iş yerine başarıyla tanımlanamadı!" +
        "Lütfen Çalışan/İş yeri Id değerlerini doğru giriniz.";
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
    const business = await Business.findById(businessId);
    const user = await User.findById(userId);

    if (!business)
      return Response.withError(res, BusinessError.businessCouldnotFound());

    if (!user) return Response.withError(res, AuthError.UserNotFound());

    if (
      !business.employeeList.some(
        employee => employee._id.toString() === user._id.toString()
      )
    )
      return Response.withError(res, BusinessError.employeeNotFound());

    business.employeeList.remove(user);
    business.save();
    // Çalışan tek bir iş yerinde mi çalışabilir?
    // Burda vereceğimiz karara göre çalışan bir iş yerinden çıktığında rolü sil
    user.roles.remove(Constants.ROLES.EMPLOYEE);
    user.save();

    Response.success(
      res,
      200,
      { user, business },
      "Çalışan belirtilen iş yerinin çalışan listesinden çıkartıldı."
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message =
        "Çalışan belirtilen iş yerinin çalışan listesinden çıkartılamadı!" +
        "Lütfen Çalışan ve İş yeri Id değerlerini doğru giriniz!";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
    console.log(error);
  }
};

exports.assignService = async (req, res) => {
  const { serviceId, employeeId, businessId, price, duration } = req.body;

  try {
    const business = await Business.findById(businessId);

    if (!business)
      return Response.withError(res, BusinessError.businessCouldnotFound());

    // Tanımlanmak istenen servis bu iş yerinin servis listesinde var mı?
    const service = business.serviceList.find(
      existingService => existingService._id.toString() === serviceId.toString()
    );
    if (!service)
      return Response.withError(res, BusinessError.serviceNotProvided());

    console.log("newPr => ", service);

    const foundEmployee = business.employeeList.find(
      emp => emp._id.toString() === employeeId.toString()
    );

    console.log("foundEmployee => ", foundEmployee);

    // Servisin tanımlanmak istendiği çalışan bu iş yerinde çalışıyor mu?
    if (!foundEmployee)
      return Response.withError(res, BusinessError.employeeNotFound());

    console.log("indexof =>", business.employeeList.indexOf(foundEmployee));

    // Bu iş tipi belirtilen çalışan için daha önceden tanımlanmış mı?

    const isAlreadyProvided = foundEmployee.providingServices.find(
      providingService =>
        providingService._id.toString() === serviceId.toString()
    );
    if (isAlreadyProvided)
      return Response.withError(res, BusinessError.serviceAlreadyProviding());

    Object.assign(service, { price, duration });
    // Object.assign(newProvidignService, { duration: `${duration}` });
    // service.price = price;
    // service.duration = duration;

    foundEmployee.providingServices.push(service);
    await business.save();
    Response.success(
      res,
      200,
      foundEmployee,
      "Servis, çalışana başarıyla tanımlandı."
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      console.log(error);
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message =
        "Çalışan için bir servis tanımlanamadı!" +
        " Lütfen çalışan/iş yeri/servis Id bilgilerini kontrol edin";
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
    const business = await Business.findById(businessId);

    if (!business)
      return Response.withError(res, BusinessError.businessCouldnotFound());

    let foundEmployee;
    if (
      !business.employeeList.some(employee => {
        if (employee._id.toString() === employeeId.toString()) {
          foundEmployee = employee;
          return true;
        }
        return false;
      })
    )
      return Response.withError(res, BusinessError.employeeNotFound());

    let deletingService;
    if (
      !foundEmployee.providingServices.some(service => {
        if (service._id.toString() === serviceId.toString()) {
          console.log("serviceId => ", serviceId);
          deletingService = service;
          console.log("deletingservice => ", deletingService);
          return true;
        }
        return false;
      })
    )
      return Response.withError(res, BusinessError.serviceNotProvided());

    foundEmployee.providingServices.pop(deletingService);
    await business.save();
    Response.success(
      res,
      200,
      business,
      "Servis tanımlanan çalışandan başarıyla silindi."
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    if (error instanceof CastError) {
      error.message =
        "Çalışanın servis listesinden silinmek istenen servis silinimedi!" +
        " Lütfen çalışan/iş yeri/servis Id bilgilerini kontrol edin.";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
    console.log(error);
  }
};
