const request = require("supertest");
const app = require("../src/app");

const db = require("./fixtures/db");

beforeEach(db.setupDatabase);

test("Should create a Sector", async () => {
  await request(app)
    .post("/admin/createSector")
    .set("Authorization", `Bearer ${db.adminJWTToken}`)
    .send({
      sectorName: "Kişisel Bakım"
    })
    .expect(201);
});
