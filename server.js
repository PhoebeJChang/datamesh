import 'express-async-errors';
import * as dotenv from 'dotenv';
import express from 'express'
import morgan from 'morgan';
import jobRouter from './routes/jobRouter.js'
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import { validateTest } from './middleware/validationMiddleware.js'

//routers
import medCaseRouter from './routes/medCaseRouter.js'

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

// import mysql from 'mysql';


// const mysql = require('mysql')
dotenv.config();
const app = express();


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(morgan('dev'));

app.use(express.json());

//repond to get request
app.get('/', (req, res) => {
  res.send('Helloooooo');
});

app.post('/api/v1/test',
  validateTest,
  (req, res) => {
    const { name } = req.body;
    res.json({ message: `hello ${name}` });
  })

//!!!!!!!!!!!!!!!!!!!!!!!!!
//宣告要的router files
app.use('/api/v1/medCases', medCaseRouter);


//any method, all the urls
//everytime the user trying to access some kinf of resource that we don't have on our server
//send 404
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

//not found and error rout
// get trigger by the existing rout
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}



