const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://admin:emre123@cluster0-n6kyu.mongodb.net/paa-db?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})