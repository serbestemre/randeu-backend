const BusinessSuccess = {};

BusinessSuccess.businessCreated = () => ({
  statusCode: 201,
  message: "Yeni iş yeri oluşturuldu"
});

BusinessSuccess.updatedBusiness = () => ({
  statusCode: 200,
  message: "İş yeri güncellendi"
});

BusinessSuccess.businessListed = () => ({
  statusCode: 200,
  message: "İş yeri profili başarıyla listelendi"
});

BusinessSuccess.businessDeleted = () => ({
  statusCode: 201,
  message: "İş yeri silindi"
});

BusinessSuccess.hiredEmployee = () => ({
  statusCode: 200,
  message: "Çalışan, iş yerine tanımlandı"
});

BusinessSuccess.dischargedEmployee = () => ({
  statusCode: 200,
  message: "Çalışan, belirtilen iş yerinin çalışan listesinden çıkartıldı"
});

BusinessSuccess.assignedService = () => ({
  statusCode: 200,
  message: "Servis, çalışana başarıyla tanımlandı"
});

BusinessSuccess.removedService = () => ({
  statusCode: 200,
  message: "Servis, tanımlanan çalışandan başarıyla silindi"
});

module.exports = BusinessSuccess;
