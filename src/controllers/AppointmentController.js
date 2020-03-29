const CastError = require("mongoose").Error.CastError;

const AppointmentService = require("../services/AppointmentService");
const Appointment = require("../models/Appointment");
const AppointmentSuccess = require("../successes/AppointmentSuccess");
const BusinessDataAccess = require("../dataAccess/Business");
const UserDataAccess = require("../dataAccess/User");
const CustomError = require("../helpers/CustomError");
const Response = require("../helpers/Response");
const CommonError = require("../errors/CommonError");
const BusinessError = require("../errors/BusinessError");

exports.requestAppointment = async (req, res) => {
  /* Check the date is empty at requested date for the appointment from employee appointments

  find all appointments from Appointment db by employee ID, date and businessID
   */

  // !!!! CHECK REQUEST APPOINTMENT SERVICE AND DATA ACCESS

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
  // Business ID and check if exists
  /*  Servis kısmında tek bir employee bazlı gününe göre
  bütün appointmentları dönen bir servis yazılacak
   */
  // Date (hangi günün) appointmentlar
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
