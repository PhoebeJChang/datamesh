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

import mysql from 'mysql';

import mssql from 'mssql';

dotenv.config();
const app = express();


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(morgan('dev'));

app.use(express.json());

const port = process.env.PORT || 5100;
// const azure_port = process.env.AZURE_PORT || 1433;

const mysql_config = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "datamesh"
})

const azure_config = {
    user: process.env.AZURE_USER,
    password: process.env.AZURE_PASSWORD,
    server: process.env.AZURE_SERVER,
    port: 1433,
    database: 'datamesh',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

try {
  await mongoose.connect(process.env.MONGO_URL)
  mysql_config.connect(function(err) {
    if (err) throw err;
  });
  mssql.connect(azure_config);

  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
  
} catch (error) {
  console.log(error);
  process.exit(1);
}

//repond to get request
app.get('/', (req, res) => {
  // res.send('Hello');

  mysql_config.query("select * from accounts", function (err, result) {
    if (err) throw err;
    res.send("Result: " + JSON.stringify(result));
  });

  // var resultSet = azure_con.request().query(`select * from accounts`);
  // res.send("Result: " + resultSet.recordset);
  
});

app.post('/api/v1/test',
  validateTest,
  (req, res) => {
    const { name } = req.body;
    res.json({ message: `hello ${name}`});
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





