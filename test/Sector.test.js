const request = require("supertest");
const app = require("../src/app");

const UserMock = require("./fixtures/UserMock");
const SectorMock = require("./fixtures/SectorMock");
jest.setTimeout(30000);

beforeEach(SectorMock.setupSectorDB);

test("Should create a Sector", async () => {
  await request(app)
    .post("/admin/sector")
    .set("Authorization", `Bearer ${UserMock.adminToken}`)
    .send({
      sectorName: "Yeni Sektör"
    })
    .expect(201);
});
