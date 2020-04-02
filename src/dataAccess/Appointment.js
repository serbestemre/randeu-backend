const Appointment = require("../models/Appointment");

exports.insertOneRequestAppointmentDB = async (
  customer,
  business,
  employee,
  service,
  day,
  hour
) =>
  Appointment.create({
    customer,
    business,
    employee,
    service,
    day,
    hour
  });

exports.employeeAppointmentScheduleDB = async (day, hour, employee, business) =>
  Appointment.find({
    day, hour, employee, business
  });

exports.businessAppointmentScheduleDB = async (day, business) =>
  Appointment.find({ day, business });

exports.businessAppointmentScheduleByEmployeeDB = async (day, business, employee) =>
  Appointment.find({ day, business, employee });
