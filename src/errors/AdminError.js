const AdminError = {};

AdminError.businessTypeCouldnotFound = () => ({
  statusCode: 404,
  message: 'İş tipi bulunamadı'
});

AdminError.noBusinessTypeByGivenSector = () => ({
  statusCode: 404,
  message: 'Aranan sektöre göre iş yeri tipi bulamadı'
});

AdminError.businessAlreadyExist = () => ({
  statusCode: 403,
  message: 'İş tipi zaten kayıtlı'
});

AdminError.serviceAlreadyExist = () => ({
  statusCode: 403,
  message: 'Servis zaten kayıtlı'
});

AdminError.sectorAlreadyExist = () => ({
  statusCode: 403,
  message: 'Sektör zaten kayıtlı'
});

module.exports = AdminError;
