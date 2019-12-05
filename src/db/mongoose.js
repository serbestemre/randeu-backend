<<<<<<< HEAD
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
=======
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://admin:emre123@cluster0-n6kyu.mongodb.net/paa-db?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
>>>>>>> 34ab9ef0d89c5f90551dbfed43ae810eba909470
