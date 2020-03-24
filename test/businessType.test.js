const request = require("supertest");
const app = require("../src/app");

const BusinessTypeMock = require("./fixtures/BusinessTypeMock");
const SectorMock = require("./fixtures/SectorMock");
const UserMock = require("./fixtures/UserMock");

jest.setTimeout(30000);

beforeEach(BusinessTypeMock.setupBusinessTypeDB);
beforeAll(SectorMock.setupSectorDB);

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
