const mongoose = require("mongoose");

const AppointmentDataAccess = require("../../src/dataAccess/Appointment");
const BusinessTypeMock = require("./BusinessTypeMock");
const BusinessMock = require("./BusinessMock");
const Appointment = require("../../src/models/Appointment");
const ServiceMock = require("./ServiceMock");
const UserMock = require("./UserMock");

const appointmentOneStartDate = "2020-06-15T15:00:00+03:00";
const appointmentOneEndDate = "2020-06-15T15:30:00+03:00";

const appointmentOneId = new mongoose.Types.ObjectId();

const appointmentOne = new Appointment({
  _id: appointmentOneId,
  customer: UserMock.customer._id,
  business: BusinessMock.businessKuafor._id,
  employee: UserMock.employeeOne._id,
  service: ServiceMock.serviceSacKesim._id,
  startDate: appointmentOneStartDate,
  endDate: appointmentOneEndDate
});

const setupAppointmentDB = async () => {
  await AppointmentDataAccess.deleteManyAppointmentsDB();
  await AppointmentDataAccess.insertManyAppointmentsDB(
    [appointmentOne]
  );
};

module.exports = {
  appointmentOne,
  setupAppointmentDB
};
