const AppointmentSuccess = {};

AppointmentSuccess.appointmentRequest = () => ({
  statusCode: 201,
  message: "Randevu talebi oluşturuldu"
});

AppointmentSuccess.CalendarListed = () => ({
  statusCode: 200,
  message: "İş yeri takvimi başarıyla listelendi"
});

module.exports = AppointmentSuccess;
