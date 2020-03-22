const request = require("supertest");
const app = require("../src/app");

const db = require("./fixtures/db");

beforeEach(db.setupDatabase);

test("Should create a user", async () => {
  await request(app)
    .post("/register")
    .send({
      fullName: "Emre Serbest",
      email: "emre2@gmail.com",
      password: "123456",
      passwordCheck: "123456"
    })
    .expect(201);
});

test("Should NOT Create the existing user", async () => {
  await request(app)
    .post("/register")
    .send({
      fullName: db.userOne.fullName,
      email: db.userOne.email,
      password: "123456",
      passwordCheck: "123456"
    })
    .expect(403);
});
