<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/userRouter');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
=======
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/userRouter')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
>>>>>>> 34ab9ef0d89c5f90551dbfed43ae810eba909470
