const request = require("supertest");
const app = require("../src/app");

const BusinessTypeMock = require("./fixtures/BusinessTypeMock");
const BusinessMock = require("./fixtures/BusinessMock");
const ServiceMock = require("./fixtures/ServiceMock");
const SectorMock = require("./fixtures/SectorMock");
const UserMock = require("./fixtures/UserMock");

jest.setTimeout(30000);

async function setupOtherDocumentsForBusinessTest() {
  await UserMock.setupUserDB();
  await SectorMock.setupSectorDB();
  await BusinessTypeMock.setupBusinessTypeDB();
  await ServiceMock.setupServiceDB();
}

beforeAll(setupOtherDocumentsForBusinessTest);
beforeEach(BusinessMock.setupBusinessDB);

test("Should create a business", async () => {
  await request(app)
    .post("/business/register")
    .set("Authorization", `Bearer ${UserMock.userOneToken}`)
    .send({
      businessName: "Yeni iş yerim",
      address: "İş yeri adresi",
      sector: SectorMock.sectorPersonalCare._id,
      businessType: BusinessTypeMock.businessTypeKuafor._id,
      businessOwnerId: UserMock.userOne._id
    })
    .expect(201);
});

test("Should not create a business unauthenticated user", async () => {
  await request(app)
    .post("/business/register")
    .send({
      businessName: "Yeni iş yerim",
      address: "İş yeri adresi",
      sector: SectorMock.sectorPersonalCare._id,
      businessType: BusinessTypeMock.businessTypeKuafor._id,
      businessOwnerId: UserMock.userOne._id
    })
    .expect(403);
});
