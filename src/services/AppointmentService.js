const moment = require("moment");
const AppointmentError = require("../errors/AppointmentError");
const BusinessDataAccess = require("../dataAccess/Business");
const ServiceDataAccess = require("../dataAccess/Service");
const BusinessError = require("../errors/BusinessError");
const UserDataAccess = require("../dataAccess/User");
const AdminError = require("../errors/AdminError");
const AppointmentDataAccess = require("../dataAccess/Appointment");

exports.requestAppointmentService = async (
  customerId,
  businessId,
  employeeId,
  serviceId,
  startDate,
  endDate
) => {
  const customer = await UserDataAccess.findUserByIdDB(customerId);

  if (!customer)
    throw AppointmentError.CustomerNotFound();


  const employee = await UserDataAccess.findUserByIdDB(employeeId);

  if (!employee)
    throw AppointmentError.EmployeeNotFound();


  const business = await BusinessDataAccess.findBusinessByIdDB(businessId);

  if (!business)
    throw BusinessError.businessNotFound();


  const foundEmployee = business.employeeList.find(
    obj => obj.employee.toString() === employeeId
  );

  if (!foundEmployee)
    throw BusinessError.employeeNotWorking();


  const service = await ServiceDataAccess.findServiceByIdDB(serviceId);
  if (!service)
    throw AdminError.ServiceNotFound();


  console.log("Employee: ", foundEmployee);
  const isProviding = await foundEmployee.providingServices.find(obj =>
    obj.service.toString() === serviceId);

  if (!isProviding)
    throw BusinessError.ServiceNotProviding();


  // @TODO check if date is okay for the employeeWorkingHours
  const newDate = new Date(date);

  const start = moment(startDate)
    .format("YYYY-MM-DD HH:mm");
  const end = moment(endDate)
    .format("YYYY-MM-DD HH:mm");
  const appointment = await AppointmentDataAccess
    .employeeAppointmentScheduleDB(day, hour, employeeId, businessId);

  if (appointment.length)
    throw AppointmentError.EmployeeIsNotAvailable();


  AppointmentDataAccess.insertOneRequestAppointmentDB(
    customerId,
    businessId,
    employeeId,
    serviceId,
    startDate,
    endDate
  );
};
exports.getCalendar = async (businessId, startingDate) => {
  const business = await BusinessDataAccess.findBusinessByIdDB(businessId);
  const startDate = moment(startingDate)
    .format("YYYY-MM-DD 00:00");
  const endDate = moment(startDate)
    .add(8, 'days')
    .format("YYYY-MM-DD 23:59");

  if (!business)
    throw BusinessError.businessNotFound();


  return AppointmentDataAccess.businessAppointmentScheduleDB(startDate, endDate, businessId);
};

exports.getEmployeeCalendar = async (businessId, date, employee) => {
  const business = await BusinessDataAccess.findBusinessByIdDB(businessId);
  const day = moment(date)
    .format("L");

  if (!business)
    throw BusinessError.businessNotFound();


  // TODO move foundEmployee function to a service
  const foundEmployee = business.employeeList.find(
    obj => obj.employee.toString() === employee
  );

  if (!foundEmployee)
    throw BusinessError.employeeNotWorking();


  return AppointmentDataAccess.businessAppointmentScheduleByEmployeeDB(day, businessId, employee);
};
