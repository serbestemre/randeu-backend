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
