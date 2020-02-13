require("dotenv").config();
const express = require("express");
const db = require("./db/mongoose");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", authRouter);
app.use("/user/", userRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({ message, data });
});

db.connectDb()
  .then(result => {
    app.listen(port, () => {
      console.log(`Server started on ` + port);
    });
  })
  .catch(err => {
    console.log("Veritabanı Hatası");
  });
