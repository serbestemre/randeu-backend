require("dotenv").config();
const express = require("express");
const db = require("./db/mongoose");

const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const businessRouter = require("./routers/businessRouter");

const app = express();
const port = process.env.PORT || 3000;

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

db.connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on ${port}`);
    });
  })
  .catch(err => {
    console.log("Veritabanı Hatası", err);
  });
