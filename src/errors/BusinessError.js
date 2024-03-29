const BusinessError = {};
const CustomError = require("../helpers/CustomError");

BusinessError.businessNotFound = () => new CustomError(400,
  "Aranan iş yeri bulunamadı");

BusinessError.providingServiceListNotFound = () => new CustomError(400,
  "Aranan çalışana göre sağlanan servis listesi bulunamadı");

BusinessError.businessListNotListed = () => new CustomError(400,
  "İşyerleri listelenemedi.");

BusinessError.businesslistNotListedByBusinessType = () => new CustomError(400,
  "Belirtilen işyeri tipine göre işyerleri listelenemedi. Lütfen farklı bir filtreleme yönetim deneyin");

BusinessError.businesslistNotListedByService = () => new CustomError(400,
  "Belirtilen hizmete göre işyerleri listelenemedi. Lütfen farklı bir filtreleme yönetim deneyin");

BusinessError.businesslistNotListedByName = () => new CustomError(400,
  "Belirtilen işyeri adına göre işyerleri listelenemedi. Lütfen farklı bir filtreleme yönetim deneyin");

BusinessError.sectorNotFound = () => new CustomError(404,
  "Sektör bulunamadı");

BusinessError.businessTypeNotFound = () => new CustomError(404,
  "İş yeri tipi bulunamadı");

BusinessError.businessOwnerNotFound = () => new CustomError(404,
  "İş yeri sahibi bulunamadı");

BusinessError.notAllowedUser = () => new CustomError(403,
  "İş yeri bilgilerini güncellemek için gerekli yetkilere sahip olmayan kullanıcı");

BusinessError.businessTypesNotMatch = () => new CustomError(400,
  "İş yeri tipiyle servisin tanımlı olduğu iş yeri tipi eşleşmiyor");

BusinessError.serviceAlreadyExists = () => new CustomError(403,
  "Bu servis zaten tanımlı");

BusinessError.employeeAlreadyExists = () => new CustomError(403,
  "Bu çalışan zaten tanımlı");

BusinessError.employeeNotFound = () => new CustomError(404,
  "Aranan çalışan bu iş yerinde bulunamadı");

BusinessError.serviceNotProvided = () => new CustomError(400,
  "Silinmek istenen servis, çalışanın sağladığı servis listesinde tanımlanmamış");

BusinessError.employeeNotWorking = () => new CustomError(404,
  "Çalışan bu iş yerinin çalışan listesinde bulunmadı");

BusinessError.ServiceNotProviding = () => new CustomError(404,
  "Servis bu iş yeri tarafından verilmiyor");

BusinessError.serviceAlreadyProviding = () => new CustomError(404,
  "İş tipi zaten bu çalışan için daha önceden tanımlanmış");

module.exports = BusinessError;
