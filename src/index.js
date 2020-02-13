require("dotenv").config();
const express = require("express");
const db = require("./db/mongoose");

const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const businessRouter = require("./routers/businessRouter");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/business", businessRouter);

app.use((error, req, res) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({ message, data });
});

db.connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on ${port}`);
    });
  })
  .catch(err => {
    console.log("Veritabanı Hatası", err);
  });
