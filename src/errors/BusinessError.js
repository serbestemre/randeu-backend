const BusinessError = {};

BusinessError.businessNotFound = () => ({
  statusCode: 404,
  message: "Aranan iş yeri bulunamadı"
});

BusinessError.sectorNotFound = () => ({
  statusCode: 404,
  message: "Tanımlanmak istenen sektör bulunamadı"
});

BusinessError.businessTypeNotFound = () => ({
  statusCode: 404,
  message: "Tanımlanmak istenen iş yeri tipi bulunamadı"
});

BusinessError.businessOwnerNotFound = () => ({
  statusCode: 404,
  message: "İş yeri sahibi bulunamadı"
});

BusinessError.notAllowedUser = () => ({
  statusCode: 403,
  message:
    "İş yeri bilgilerini güncellemek için gerekli yetkilere sahip olmayan kullanıcı"
});

BusinessError.businessTypesNotMatch = () => ({
  statusCode: 400,
  message: "İş yeri tipiyle servisin tanımlı olduğu iş yeri tipi eşleşmiyor"
});

BusinessError.serviceAlreadyExists = () => ({
  statusCode: 403,
  message: "Bu servis zaten tanımlı"
});

BusinessError.employeeAlreadyExists = () => ({
  statusCode: 403,
  message: "Bu çalışan zaten tanımlı"
});

BusinessError.employeeNotFound = () => ({
  statusCode: 404,
  message: "Aranan çalışan bu iş yerinde bulunamadı!"
});

BusinessError.serviceNotProvided = () => ({
  statusCode: 400,
  message:
    "Silinmek istenen servis, çalışanın sağladığı servis listesinde tanımlanmamış!"
});

BusinessError.serviceAlreadyProviding = () => ({
  statusCode: 403,
  message: "İş tipi zaten bu çalışan için daha önceden tanımlanmış!"
});

module.exports = BusinessError;
