const Appointment = require("../models/Appointment");



exports.insertOneRequestAppointmentDB = async (
  customer,
  business,
  employee,
  service,
  startDate,
  endDate
) =>
  Appointment.create({
    customer,
    business,
    employee,
    service,
    startDate,
    endDate
  });

exports.employeeAppointmentScheduleDB = async (day, hour, employee, business) =>
  Appointment.find({
    day,
    hour,
    employee,
    business
  });

exports.businessAppointmentScheduleDB = async (
  startDate,
  endDate,
  id
) => Appointment.find({
  $and: [
    {
      startDate: {
        $gte: startDate,
        $lte: endDate
      }
    },
    { business: id }
  ]
});


exports.businessAppointmentScheduleByEmployeeDB = async (
  day,
  business,
  employee
) => Appointment.find({ day, business, employee });
