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

module.exports = BusinessError;
