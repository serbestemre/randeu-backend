const mongoose = require("mongoose");

exports.connectDb = () => {
  console.log("db connection");
  return mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};
