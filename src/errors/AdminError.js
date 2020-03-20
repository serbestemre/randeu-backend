const AdminError = {};

AdminError.businessTypeNotFound = () => ({
  statusCode: 404,
  message: "İş tipi bulunamadı"
});

AdminError.businessTypeNotFoundByGivenSector = () => ({
  statusCode: 404,
  message: "Aranan sektöre göre iş yeri tipi bulamadı"
});

AdminError.servicesNotFoundByGivenBusinessType = () => ({
  statusCode: 404,
  message: "Aranan iş tipine göre servis bulunamadı"
});

AdminError.businessAlreadyExists = () => ({
  statusCode: 409,
  message: "İş tipi zaten kayıtlı"
});

AdminError.serviceAlreadyExists = () => ({
  statusCode: 409,
  message: "Servis zaten kayıtlı"
});

AdminError.sectorAlreadyExists = () => ({
  statusCode: 403,
  message: "Sektör zaten kayıtlı"
});

AdminError.sectorNotFound = () => ({
  statusCode: 404,
  message: "Sektör bulunamadı"
});

AdminError.serviceNotFound = () => ({
  statusCode: 404,
  message: "Servis bulunamadı"
});

module.exports = AdminError;
