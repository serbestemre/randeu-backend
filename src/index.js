require("dotenv").config();
const express = require("express");
require("./db/mongoose");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", authRouter);
app.use("/user/", userRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
