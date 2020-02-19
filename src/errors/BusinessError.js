const BusinessError = {};
BusinessError.sectorCouldnotFound = () => ({
  statusCode: 404,
  message: "Tanımlanmak istenen sektör bulunamadı!"
});

BusinessError.businessTypeCouldnotFound = () => ({
  statusCode: 404,
  message: "Tanımlanmak istenen iş yeri tipi bulunamadı!"
});

BusinessError.notAllowedUser = () => ({
  statusCode: 401,
  message:
    "İş yeri bilgilerini güncellemek için gerekli yetkilere sahip olmayan kullanıcı."
});

BusinessError.businessOwnerCouldntFound = () => ({
  statusCode: 404,
  message: "İş yeri sahibi bulunamadı"
});

module.exports = BusinessError;
