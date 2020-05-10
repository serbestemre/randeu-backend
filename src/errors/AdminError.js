const AdminError = {};
const CustomError = require("../helpers/CustomError");

AdminError.BusinessTypeNotFound = () => new CustomError(404, "İş tipi bulunamadı");

AdminError.BusinessTypeNotFoundByGivenSector = () => new CustomError(
  404,
  "Aranan sektöre göre iş yeri tipi bulamadı"
);

AdminError.ServicesNotFoundByGivenBusinessType = () => new CustomError(
  404,
  "Aranan iş tipine göre servis bulunamadı"
);

AdminError.BusinessTypeAlreadyExists = () => new CustomError(409, "İş tipi zaten kayıtlı");

AdminError.ServiceAlreadyExists = () => new CustomError(409, "Servis zaten kayıtlı");

AdminError.SectorAlreadyExists = () => new CustomError(403, "Sektör zaten kayıtlı");

AdminError.SectorNotFound = () => new CustomError(404, "Sektör bulunamadı");

AdminError.ServiceNotFound = () => new CustomError(404, "Servis bulunamadı");

module.exports = AdminError;
