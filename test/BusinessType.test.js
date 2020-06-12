const request = require("supertest");
const app = require("../src/app");

const BusinessTypeMock = require("./fixtures/BusinessTypeMock");
const SectorMock = require("./fixtures/SectorMock");
const UserMock = require("./fixtures/UserMock");

jest.setTimeout(30000);

beforeAll(SectorMock.setupSectorDB);
beforeEach(BusinessTypeMock.setupBusinessTypeDB);

test("Should create a BusinessType", async () => {
  await request(app)
    .post("/admin/businesstype")
    .set("Authorization", `Bearer ${UserMock.adminToken}`)
    .send({
      businessTypeName: "Kuaför Örnek İş Tipi",
      sector: SectorMock.sectorPersonalCare._id
    })
    .expect(201);
});

test("Should not create a BusinessType without admin role", async () => {
  await request(app)
    .post("/admin/businesstype")
    .send({
      businessTypeName: "Kuaför Örnek İş Tipi2",
      sector: SectorMock.sectorPersonalCare._id
    })
    .expect(403);
});
