const AdminError = {};
const CustomError = require("../helpers/CustomError");

AdminError.BusinessTypeNotFound = () => new CustomError(404, "İş tipi bulunamadı");

AdminError.businessTypeNotFoundByGivenSector = () => new CustomError(
  404,
  "Aranan sektöre göre iş yeri tipi bulamadı"
);

AdminError.servicesNotFoundByGivenBusinessType = () => new CustomError(
  404,
  "Aranan iş tipine göre servis bulunamadı"
);

AdminError.businessAlreadyExists = () => new CustomError(409, "İş tipi zaten kayıtlı");

AdminError.serviceAlreadyExists = () => new CustomError(409, "Servis zaten kayıtlı");

AdminError.sectorAlreadyExists = () => new CustomError(403, "Sektör zaten kayıtlı");

AdminError.SectorNotFound = () => new CustomError(404, "Sektör bulunamadı");

AdminError.serviceNotFound = () => new CustomError(404, "Servis bulunamadı");

module.exports = AdminError;
