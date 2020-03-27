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


    const foundEmployee = await UserDataAccess.findUserByIdDB(employeeId);
    if (!foundEmployee)
      console.log("Employee yok");


    const employee = employeeId;
    const employeeAppointments = await Appointment.find({ employee });

    employeeAppointments.forEach(app => console.log("APP DATE", app.date));

    // console.log(employeeAppointments);

    const requestedDay = new Date(date);
    // console.log("Req DAY: ", requestedDay);
    const weekday = requestedDay.getDay();// haftanın kaçıncı günü
    // console.log("weekDay: ", weekday);
    const options = { weekday: 'long' };
    // const dayName = new Intl.DateTimeFormat('tr-TR', options).format(requestedDay);

    // örn: pazartesi salı
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const d = new Date(requestedDay);
    const dayName = days[d.getDay()];


    // çalışma günleri içnerisinde mi?
    const isBusinessOpen = business.calendar[0].day.find(day => day === dayName);
    console.log("dayName: ", dayName);

    if (!isBusinessOpen)
      console.log("iş yeri kapalı!");


    const opening = business.calendar[0].opening;
    const closing = business.calendar[0].closing;
    const interval = business.calendar[0].interval;

    const starting = opening;
    let status = "";

    while (starting < closing) {
      const isMatch = employeeAppointments.find(appointment =>
        (appointment.date.toString() === starting.toString() && appointment.status !== "REJECTED"));

      if (isMatch)
        status = `DOLU *** Appointment.status= ${isMatch.status}`;
      else
        status = "BOŞ";

      const ending = new Date(opening.setMinutes(starting.getMinutes() + interval.getMinutes()));
      console.log("Başlangıç:", `${starting.getHours()}:${starting.getMinutes()}`, "-", "Bitiş: ", `${ending.getHours()}:${ending.getMinutes()}`, "Durum: ", status);
      console.log();
    }
  } catch (error) {
    console.log(error);
    console.log("neler oluyor????");
  }
};
