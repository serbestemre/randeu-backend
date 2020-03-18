if (process.env.NODE_ENV === "test")
  require("dotenv").config({ path: ".env.test" });
else require("dotenv").config({ path: ".env.dev" });

const express = require("express");
require("./db/mongoose");

const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const businessRouter = require("./routers/businessRouter");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/business", businessRouter);

module.exports = app;
