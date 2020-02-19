const BusinessError = {};
BusinessError.sectorCouldnotFound = () => ({
  statusCode: 404,
  message: "Tanımlanmak istenen sektör bulunamadı!"
});

BusinessError.businessTypeCouldnotFound = () => ({
  statusCode: 404,
  message: "Tanımlanmak istenen iş yeri tipi bulunamadı!"
});

module.exports = BusinessError;
