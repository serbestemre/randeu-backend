const AppointmentError = {};
const CustomError = require("../helpers/CustomError");

AppointmentError.CustomerNotFound = () => new CustomError(404, "Müşteri bulunamadı");
AppointmentError.EmployeeNotFound = () => new CustomError(404, "Çalışan bulunamadı");

AppointmentError.EmployeeIsNotAvailable = () => new CustomError(400,
  "Randevu almak istediğiniz saat uygun değil.");

module.exports = AppointmentError;
