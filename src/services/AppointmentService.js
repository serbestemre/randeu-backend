const AppointmentError = require("../errors/AppointmentError");
const BusinessDataAccess = require("../dataAccess/Business");
const ServiceDataAccess = require("../dataAccess/Service");
const BusinessError = require("../errors/BusinessError");
const UserDataAccess = require("../dataAccess/User");
const AdminError = require("../errors/AdminError");
const AppointmentDB = require("../dataAccess/Appointment");


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

  const service = await ServiceDataAccess.findServiceByIdDB(serviceId);
  if (!service)
    throw AdminError.ServiceNotFound();

  return AppointmentDB.insertOneRequestAppointmentDB(
    customerId,
    businessId,
    employeeId,
    serviceId,
    date
  );
};
