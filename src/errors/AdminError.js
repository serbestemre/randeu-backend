const AdminError = {};

AdminError.businessTypeCouldnotFound = () => ({
  statusCode: 404,
  message: "İş tipi bulunamadı"
});

AdminError.businessAlreadyExist = () => ({
  statusCode: 403,
  message: "İş tipi zaten kayıtlı"
});

module.exports = AdminError;
