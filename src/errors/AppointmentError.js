const AppointmentError = {};
const CustomError = require("../helpers/CustomError");

AppointmentError.CustomerNotFound = () => new CustomError(404, "Müşteri bulunamadı");
AppointmentError.EmployeeNotFound = () => new CustomError(404, "Çalışan bulunamadı");


module.exports = AppointmentError;
