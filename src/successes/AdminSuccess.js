const AdminSuccess = {};

AdminSuccess.SectorCreated = () => ({
  statusCode: 201,
  message: "Sektör başarıyla oluşturuldu"
});

AdminSuccess.SectorsListed = () => ({
  statusCode: 200,
  message: "Sektörler başarıyla listelendi"
});

AdminSuccess.SectorUpdated = () => ({
  statusCode: 200,
  message: "Sektör başarıyla güncellendi"
});

AdminSuccess.SectorDeleted = () => ({
  statusCode: 201,
  message: "Sektör başarıyla silindi"
});

AdminSuccess.BusinessTypeCreated = () => ({
  statusCode: 201,
  message: "İşyeri tipi başarıyla oluşturuldu"
});

AdminSuccess.BusinessTypeListed = () => ({
  statusCode: 200,
  message: "İşyeri tipleri başarıyla listelendi"
});

AdminSuccess.BusinessTypeUpdated = () => ({
  statusCode: 200,
  message: "İşyeri tipi başarıyla güncellendi"
});

AdminSuccess.BusinessTypeDeleted = () => ({
  statusCode: 201,
  message: "İşyeri tipi başarıyla silindi"
});

AdminSuccess.ServiceCreated = () => ({
  statusCode: 201,
  message: "Servis başarıyla oluşturuldu"
});

AdminSuccess.ServicesListedByBusiness = () => ({
  statusCode: 200,
  message: "İşyeri tipine göre servisler başarıyla listelendi"
});

AdminSuccess.ServiceUpdated = () => ({
  statusCode: 200,
  message: "Servis başarıyla güncellendi"
});

AdminSuccess.ServiceDeleted = () => ({
  statusCode: 201,
  message: "Servis başarıyla silindi"
});

module.exports = AdminSuccess;
