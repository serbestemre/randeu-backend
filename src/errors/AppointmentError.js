const AppointmentError = {};
const CustomError = require("../helpers/CustomError");

AppointmentError.CustomerNotFound = () => new CustomError(404, "Müşteri bulunamadı");
AppointmentError.EmployeeNotFound = () => new CustomError(404, "Çalışan bulunamadı");

AppointmentError.EmployeeIsNotAvailable = () => new CustomError(409,
  "Randevu almak istediğiniz saat uygun değil.");
AppointmentError.invalidDateFormat = () => new CustomError(400,
  "Girilen tarih formatı hatalı. Geçerli tarih formatı (YYYY-MM-DD HH:mm)");

module.exports = AppointmentError;
