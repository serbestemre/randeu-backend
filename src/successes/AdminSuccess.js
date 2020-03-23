const AdminSuccess = {};

// TODO Updated status Code should be 200

AdminSuccess.sectorCreated = () => ({
  statusCode: 201,
  message: "Sektör başarıyla oluşturuldu"
});

AdminSuccess.sectorsListed = () => ({
  statusCode: 200,
  message: "Sektörler başarıyla listelendi"
});

AdminSuccess.sectorUpdated = () => ({
  statusCode: 201,
  message: "Sektör başarıyla güncellendi"
});

AdminSuccess.sectorDeleted = () => ({
  statusCode: 201,
  message: "Sektör başarıyla silindi"
});

AdminSuccess.businessTypeCreated = () => ({
  statusCode: 201,
  message: "İşyeri tipi başarıyla oluşturuldu"
});

AdminSuccess.businessTypeListed = () => ({
  statusCode: 200,
  message: "İşyeri tipleri listelendi"
});

AdminSuccess.businessTypeUpdated = () => ({
  statusCode: 201,
  message: "İşyeri tipi güncellendi"
});

AdminSuccess.businessTypeDeleted = () => ({
  statusCode: 201,
  message: "İşyeri tipi silindi"
});

AdminSuccess.serviceCreated = () => ({
  statusCode: 201,
  message: "Servis oluşturuldu"
});

AdminSuccess.servicesListedByBusiness = () => ({
  statusCode: 200,
  message: "İşyeri tipine göre servisler listelendi"
});

AdminSuccess.serviceUpdated = () => ({
  statusCode: 201,
  message: "Servis güncellendi"
});

AdminSuccess.serviceDeleted = () => ({
  statusCode: 201,
  message: "Servis silindi"
});

module.exports = AdminSuccess;
