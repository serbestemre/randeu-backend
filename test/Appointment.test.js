const request = require("supertest");
const app = require("../src/app");

const BusinessTypeMock = require("./fixtures/BusinessTypeMock");
const BusinessMock = require("./fixtures/BusinessMock");
const ServiceMock = require("./fixtures/ServiceMock");
const SectorMock = require("./fixtures/SectorMock");
const UserMock = require("./fixtures/UserMock");
const AppointmentMock = require("./fixtures/AppointmentMock");


jest.setTimeout(30000);

async function setupOtherDocumentsForAppointmentTest() {
  await UserMock.setupUserDB();
  await SectorMock.setupSectorDB();
  await BusinessMock.setupBusinessDB();
  await BusinessTypeMock.setupBusinessTypeDB();
  await ServiceMock.setupServiceDB();
}

beforeAll(setupOtherDocumentsForAppointmentTest);
beforeEach(AppointmentMock.setupAppointmentDB);

test("Should list business calendar", async () => {
  await request(app)
    .post("/appointment/businessCalendar")
    .set("Authorization", `Bearer ${UserMock.userOneToken}`)
    .send({
      businessId: BusinessMock.businessKuafor._id,
      startDate: AppointmentMock.appointmentOne.startDate
    })
    .expect(200);
});

test("Should not list business calendar", async () => {
  await request(app)
    .post("/appointment/businessCalendar")
    .set("Authorization", `Bearer ${UserMock.userOneToken}`)
    .send({
      businessId: BusinessMock.businessKuafor._id
    })
    .expect(400);
});

test("Should make an appointment request", async () => {
  await request(app)
    .post("/appointment/request")
    .set("Authorization", `Bearer ${UserMock.userOneToken}`)
    .send({
      customerId: UserMock.customer._id,
      businessId: BusinessMock.businessKuafor._id,
      employeeId: UserMock.employeeOne._id,
      serviceId: ServiceMock.serviceSacKesim._id,
      startDate: AppointmentMock.startDate,
      endDate: AppointmentMock.endDate
    })
    .expect(201);
});

test("Should not make an appointment request", async () => {
  const appointmentOneStartDate = "2020-06-15T15:00:00+03:00";
  const appointmentOneEndDate = "2020-06-15T15:30:00+03:00";
  await request(app)
    .post("/appointment/request")
    .set("Authorization", `Bearer ${UserMock.userOneToken}`)
    .send({
      customerId: UserMock.customer._id,
      businessId: BusinessMock.businessKuafor._id,
      employeeId: UserMock.employeeOne._id,
      serviceId: ServiceMock.serviceSacKesim._id,
      startDate: appointmentOneStartDate,
      endDate: appointmentOneEndDate
    })
    .expect(409);
});
