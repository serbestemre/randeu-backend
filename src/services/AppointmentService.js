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

  const employee = await UserDataAccess.findUserByIdDB(customerId);

  if (!employee)
    throw AppointmentError.EmployeeNotFound();

  const business = await BusinessDataAccess.findBusinessByIdDB(businessId);

  if (!business)
    throw BusinessError.businessNotFound();

  const isWorking = await business.employeeList.find(obj => {
    console.log(obj);
    return obj.employee.toString() === employeeId;
  });

  if (!isWorking)
    throw BusinessError.employeeNotWorking();

  const service = await ServiceDataAccess.findServiceByIdDB(serviceId);
  if (!service)
    throw AdminError.ServiceNotFound();

  const isProviding = await employee.providingServices.find(obj =>
    obj.service.toString() === serviceId);

  if (!isProviding)
    throw BusinessError.ServiceNotProviding();

  // @TODO check if date is okay for the employeeWorkingHours
  const newDate = new Date(date);
  const isAvailable = await AppointmentDataAccess
    .isEmployeeAvailableDB(date, employeeId, businessId);

  if (!isAvailable)
    throw AppointmentError.EmployeeIsNotAvailable();

  return AppointmentDataAccess.insertOneRequestAppointmentDB(
    customerId,
    businessId,
    employeeId,
    serviceId,
    date
  );
};
