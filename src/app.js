if (process.env.NODE_ENV === "test")
  require("dotenv").config({ path: ".env.test" });
else require("dotenv").config({ path: ".env.dev" });

const express = require("express");
const helmet = require("helmet");
require("./db/mongoose");

const authRouter = require("./routes/AuthRouter");
const userRouter = require("./routes/UserRouter");
const adminRouter = require("./routes/AdminRouter");
const businessRouter = require("./routes/BusinessRouter");
const appointmentRouter = require("./routes/AppointmentRouter");

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
app.use(helmet());
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/business", businessRouter);
app.use("/appointment", appointmentRouter);

module.exports = app;
