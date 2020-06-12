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
      email: "emre2@gmail.com",
      password: "123456",
      passwordCheck: "123456"
    })
    .expect(200);
});

test("Should NOT Create the existing user", async () => {
  await request(app)
    .post("/register")
    .send({
      fullName: UserMock.userOne.fullName,
      email: UserMock.userOne.email,
      password: "123456",
      passwordCheck: "123456"
    })
    .expect(400);
});
