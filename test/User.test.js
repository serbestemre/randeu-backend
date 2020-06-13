const request = require("supertest");
const app = require("../src/app");

const UserMock = require("./fixtures/UserMock");

jest.setTimeout(30000);

beforeEach(UserMock.setupUserDB);

test("Should create a user", async () => {
  await request(app)
    .post("/register")
    .send({
      fullName: "Emre Serbest",
      email: "emre@test.com",
      password: "123456",
      passwordCheck: "123456"
    })
    .expect(200);
});

test("Should NOT Create  user with invalid password", async () => {
  await request(app)
    .post("/register")
    .send({
      fullName: "Sercan Kavdır",
      email: "sercan@test.com",
      password: "123",
      passwordCheck: "123"
    })
    .expect(400);
});
