const Appointment = require("../models/Appointment");

exports.deleteManyAppointmentsDB = async () =>
  Appointment.deleteMany();


exports.insertManyAppointmentsDB = async appointments =>
  Appointment.insertMany(appointments);

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

exports.employeeAppointmentScheduleDB = async (customer, startDate, endDate, employee, business) =>
  Appointment.find({
    customer,
    startDate,
    endDate,
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
