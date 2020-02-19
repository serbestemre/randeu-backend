const AdminError = {};

AdminError.businessTypeCouldnotFound = () => ({
  statusCode: 404,
  message: "İş tipi bulunamadı"
});

module.exports = AdminError;
