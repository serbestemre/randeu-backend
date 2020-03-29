const Appointment = require("../models/Appointment");

exports.insertOneRequestAppointmentDB = async (
  customer,
  business,
  employee,
  service,
  date
) =>
  Appointment.create({
    customer,
    business,
    employee,
    service,
    date
  });

exports.isEmployeeAvailableDB = async (date, employee, business) => {
  console.log("Buraya vardınız");
  return Appointment.find({ date, employee, business });
};
