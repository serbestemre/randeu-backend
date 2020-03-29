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
  date
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
  // const newDate = new Date(date);

  const appointment = await AppointmentDataAccess
    .isEmployeeAvailableDB(date, employeeId, businessId);

  if (appointment.length)
    throw AppointmentError.EmployeeIsNotAvailable();

  return AppointmentDataAccess.insertOneRequestAppointmentDB(
    customerId,
    businessId,
    employeeId,
    serviceId,
    date
  );
};

exports.getCalendar = async (businessId, date) => {
  const business = await BusinessDataAccess.findBusinessByIdDB(businessId);

  if (!business)
    throw BusinessError.businessNotFound();

  const appointments = await AppointmentDataAccess.findAppointmentPerEmployee(business);
};
