const CastError = require("mongoose").Error.CastError;

const AppointmentService = require("../services/AppointmentService");
const AppointmentSuccess = require("../successes/AppointmentSuccess");
const BusinessDataAccess = require("../dataAccess/Business");
const UserDataAccess = require("../dataAccess/User");
const CustomError = require("../helpers/CustomError");
const Response = require("../helpers/Response");
const CommonError = require("../errors/CommonError");
const BusinessError = require("../errors/BusinessError");

exports.requestAppointment = async (req, res) => {
  const {
    customerId, businessId, employeeId, serviceId, date
  } = req.body;

  try {
    const appointment = await AppointmentService.requestAppointmentService(
      customerId.trim(),
      businessId.trim(),
      employeeId.trim(),
      serviceId.trim(),
      date
    );

    Response.success(res, AppointmentSuccess.appointmentRequest(), appointment);
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);

    if (error instanceof CastError) {
      error.message = "Bir çok şey ters gittti!";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    Response.withError(res, CommonError.serverError());
  }
};


exports.getEmployeeCalendar = async (req, res) => {
  const { businessId, employeeId, date } = req.body;
  try {
    const business = await BusinessDataAccess.findBusinessByIdDB(businessId);
    if (!business)
      console.log("Business yok");

    const employee = await UserDataAccess.findUserByIdDB(employeeId);
    if (!employee)
      console.log("Employee yok");

    const requestedDay = new Date(date);
    console.log("Req DAY: ", requestedDay);
    const weekday = requestedDay.getDay();// haftanın kaçıncı günü
    const options = { weekday: 'long' };
    const longDayName = new Intl.DateTimeFormat('tr-TR', options).format(requestedDay);
    // örn: pazartesi salı

    // çalışma günleri içnerisinde mi?
    const isBusinessOpen = business.calendar[0].day.find(day => day === longDayName);
    console.log("LONGDAYNAME: ", longDayName);

    if (!isBusinessOpen)
      console.log("iş yeri kapalı!");

    const opening = business.calendar[0].opening;
    const closing = business.calendar[0].closing;

    const interval = business.calendar[0].interval;

    while (opening < closing) {
      console.log("randevu başlangıç: ", opening);
      console.log("randevu bitiş: ", opening.setMinutes(opening.getMinutes() + interval.getMinutes()));
    }
  } catch (error) {
    console.log(error);
    console.log("neler oluyor????");
  }
};
