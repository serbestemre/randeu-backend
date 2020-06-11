const request = require("supertest");
const app = require("../src/app");

const BusinessTypeMock = require("./fixtures/BusinessTypeMock");
const SectorMock = require("./fixtures/SectorMock");
const ServiceMock = require("./fixtures/ServiceMock");
const UserMock = require("./fixtures/UserMock");

jest.setTimeout(30000);

async function setupOtherDocumentsForServiceTest() {
  await SectorMock.setupSectorDB();
  await BusinessTypeMock.setupBusinessTypeDB();
}

beforeAll(setupOtherDocumentsForServiceTest);
beforeEach(ServiceMock.setupServiceDB);

test("Should create a service", async () => {
  await request(app)
    .post("/admin/service")
    .set("Authorization", `Bearer ${UserMock.adminToken}`)
    .send({
      serviceName: "Kuaför Örnek Hizmet",
      businessType: BusinessTypeMock.businessTypeKuafor._id
    })
    .expect(201);
});

test("Should not create a service without admin role", async () => {
  await request(app)
    .post("/admin/service")
    .send({
      serviceName: "Kuaför Örnek Hizmet2",
      businessType: BusinessTypeMock.businessTypeKuafor._id
    })
    .expect(403);
});