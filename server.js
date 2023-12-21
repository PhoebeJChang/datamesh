import 'express-async-errors';
import * as dotenv from 'dotenv';
import express from 'express'
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { body, validationResult } from 'express-validator';
//routers
import medCaseRouter from './routes/medCaseRouter.js'
import authRouter from './routes/authRouter.js';
import basicInfoRouter from './routes/basicInfoRouter.js';
import userRouter from './routes/userRouter.js';
import showUser from './routes/showUserRouter.js';
import showUserAzureRouter from './routes/showUserAzureRouter.js';
import showUserMySQLRouter from './routes/showUserMySQLRouter.js';
//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import mysql from 'mysql';
import mssql from 'mssql';
import cors from 'cors';
dotenv.config();
const app = express();
//跨域請求
// const cors = require('cors');
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 5100;
//azure
const port2 = process.env.AZURE_PORT;

/*MYSQL註解掉的地方*/
export const mysql_config = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "datamesh"
})

// export default mysql_config;

export const azure_config = {
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
  /*MYSQL註解掉的地方*/
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
//respond to get request, query will move later
app.get('/api/v1/mysql', (req, res) => {
  // var request = new mssql.Request()
  // request.query(`select * from users`, (err, result) => {
  //   if (err) throw err;
  //   res.send("Result: " + JSON.stringify(result));
  // });
});
//temporaly dont need it
// app.post('/api/v1/test',
//   validateTest,
//   (req, res) => {
//     const { name } = req.body;
//     res.json({ message: `hello ${name}` });
//   })
app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});
//!!!!!!!!!!!!!!!!!!!!!!!!!
//宣告要的router files
app.use('/api/v1/medCases', medCaseRouter);
app.use('/api/v1/basicInfo', authenticateUser, basicInfoRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/showUser', authenticateUser, showUser);
app.use('/api/v1/showUserAzure',  authenticateUser, showUserAzureRouter);
app.use('/api/v1/showUserMySQL', authenticateUser, showUserMySQLRouter);

//for admin pages (not yet created)
app.use('/api/v1/users', authenticateUser, userRouter);

//any method, all the urls
//everytime the user trying to access some kinf of resource that we don't have on our server
//send 404
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});
//not found and error rout
// get trigger by the existing rout
app.use(errorHandlerMiddleware);