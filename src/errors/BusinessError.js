const BusinessError = {};

BusinessError.businessCouldnotFound = () => ({
  statusCode: 404,
  message: "Aranan iş yeri bulunamadı!"
});

BusinessError.sectorCouldnotFound = () => ({
  statusCode: 404,
  message: "Tanımlanmak istenen sektör bulunamadı!"
});

BusinessError.businessTypeCouldnotFound = () => ({
  statusCode: 404,
  message: "Tanımlanmak istenen iş yeri tipi bulunamadı!"
});

BusinessError.businessOwnerCouldnotFound = () => ({
  statusCode: 404,
  message: "İş yeri sahibi bulunamadı!"
});

BusinessError.notAllowedUser = () => ({
  statusCode: 401,
  message:
    "İş yeri bilgilerini güncellemek için gerekli yetkilere sahip olmayan kullanıcı."
});

BusinessError.BusinessTypesNotMatch = () => ({
  statusCode: 400,
  message: "İş yeri tipiyle servisin tanımlı olduğu iş yeri tipi eşleşmiyor."
});

BusinessError.ServiceAlreadyExist = () => ({
  statusCode: 403,
  message: "Bu servis zaten tanımlı."
});

BusinessError.employeeAlreadyExist = () => ({
  statusCode: 403,
  message: "Bu çalışan zaten tanımlı."
});
BusinessError.employeeNotFound = () => ({
  statusCode: 404,
  message: "Aranan çalışan bu iş yerinde bulunamadı!"
});
BusinessError.serviceNotProvided = () => ({
  statusCode: 400,
  message:
    "Tanımlanmak istenen iş tipi bu iş yerinin servis listesine tanımlanmamış!"
});

module.exports = BusinessError;
