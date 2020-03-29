const CastError = require("mongoose").Error.CastError;

const AppointmentService = require("../services/AppointmentService");
const AppointmentSuccess = require("../successes/AppointmentSuccess");
const CustomError = require("../helpers/CustomError");
const Response = require("../helpers/Response");
const CommonError = require("../errors/CommonError");

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
    console.log(error);

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


exports.businessCalendar = async (req, res) => {
  const { businessId, date } = req.body;

  try {
    const calendar = await AppointmentService.getCalendar(
      businessId.trim(),
      date
    );

    Response.success(res, AppointmentSuccess.CalendarListed(), calendar);
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);


    if (error instanceof CastError) {
      error.message = "Bir çok şey ters gittti!";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};
