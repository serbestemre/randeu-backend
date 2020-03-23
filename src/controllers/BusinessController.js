const CastError = require("mongoose").Error.CastError;
const BusinessSuccess = require("../successes/BusinessSuccess");
const BusinessService = require("../services/BusinessService");
const CustomError = require("../helpers/CustomError");
const CommonError = require("../errors/CommonError");
const Response = require("../helpers/Response");

// TODO Check requester userId ===? businessOwnerId/EmployeeId

exports.createBusiness = async (req, res) => {
  try {
    const {
      businessName, address, sector, businessType, businessOwnerId
    } = req.body;

    const newBusiness = await BusinessService.createBusinessService(
      businessName.trim(),
      address.trim(),
      sector.trim(),
      businessType.trim(),
      businessOwnerId.trim()
    );

    Response.success(res, BusinessSuccess.businessCreated(), newBusiness);
  } catch (error) {
    if (error instanceof CustomError) return Response.withError(res, error);
    if (error instanceof CastError) {
      error.message = "Sektörler listelenemedi!";
      Object.assign(
        error, { statusCode: 400 }
      );
    }
    Response.withError(res, CommonError.serverError());
  }
};

exports.updateBusiness = async (req, res) => {
  try {
    const {
      updatedBusinessName, updatedAddress, updatedSector,
      updatedBusinessType, updatedBusinessOwner, userId
    } = req.body;

    const { businessId } = req.params;

    const updatedBusiness = await BusinessService.updateBusinessService(
      businessId.trim(),
      updatedBusinessName.trim(),
      updatedAddress.trim(),
      updatedSector.trim(),
      updatedBusinessType.trim(),
      updatedBusinessOwner.trim(),
      userId.trim()
    );

    Response.success(res, BusinessSuccess.updatedBusiness(), updatedBusiness);
  } catch (error) {
    if (error instanceof CustomError) return Response.withError(res, error);
    if (error instanceof CastError) {
      error.message = "İş yeri güncellenemedi!";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
  }
};

exports.profile = async (req, res) => {
  try {
    const { businessId } = req.params;

    const business = await BusinessService.profileService(businessId.trim());

    Response.success(res, BusinessSuccess.businessListed(), business);
  } catch (error) {
    if (error instanceof CustomError) return Response.withError(res, error);
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
  try {
    const { businessId } = req.params;
    await BusinessService.deleteBusinessService(businessId.trim());

    Response.success(res, BusinessSuccess.businessDeleted());
  } catch (error) {
    if (error instanceof CustomError) return Response.withError(res, error);
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

// TODO Add workingBusinessId to the user's model when a user hired
exports.hireEmployee = async (req, res) => {
  try {
    const { userId, businessId } = req.body;
    const business = await BusinessService.hireEmployeeService(
      userId.trim(), businessId.trim()
    );

    Response.success(res,
      BusinessSuccess.hiredEmployee(), business);
  } catch (error) {
    if (error instanceof CustomError) return Response.withError(res, error);
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
  try {
    const { userId, businessId } = req.body;

    const dischargedEmployee = await BusinessService.dischargeEmployeeService(userId.trim(), businessId.trim());

    Response.success(res, BusinessSuccess.dischargedEmployee(), { dischargedEmployee });
  } catch (error) {
    if (error instanceof CustomError) return Response.withError(res, error);
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
  try {
    const {
      serviceId, employeeId, businessId, price, duration
    } = req.body;

    const business = await BusinessService.assignService(
      serviceId.trim(), employeeId.trim(), businessId.trim(), price, duration
    );
    Response.success(res, BusinessSuccess.assignedService(), business);
  } catch (error) {
    if (error instanceof CustomError) return Response.withError(res, error);
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
  try {
    const { businessId, employeeId, serviceId } = req.body;

    const business = await BusinessService.removeService(
      businessId.trim(), employeeId.trim(), serviceId.trim()
    );

    Response.success(res, BusinessSuccess.removedService(), business);
  } catch (error) {
    if (error instanceof CustomError) return Response.withError(res, error);
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
