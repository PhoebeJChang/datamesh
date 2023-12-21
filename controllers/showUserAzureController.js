import { StatusCodes } from "http-status-codes";
import { azure_config } from "../server.js";
import express from 'express';
import mssql from 'mssql';

//get all users
export const getAllUsers = async (req, res) => {
  var request = new mssql.Request()

  /*********************************
   * for searching and sorting
   *********************************/
  const { search, sort } = req.query;

  // Define the base SQL query
  let sqlQuery = "SELECT * FROM users WHERE 1=1"; // Start with a basic query

  // Add searching
  if (search) {
    // Customize the search criteria based on your requirements
    const numericSearch = parseInt(search);
    if (!isNaN(numericSearch)) {
      sqlQuery += ` AND id = ${numericSearch}`;
    } else {
      sqlQuery += ` AND (name LIKE '%${search}%' OR email LIKE '%${search}%')`;
    }
  }

  // Define sort options
  const sortOptions = {
    ascending: 'id ASC',
    descending: 'id DESC',
  };

  //if client didn't select specific way, default will
  // Determine the sort key
  const sortKey = sortOptions[sort] || sortOptions.ascending;

  // Add sorting
  sqlQuery += ` ORDER BY ${sortKey}`;

  /*********************************
   * setup for pagination
   *********************************/
  // get the current page from client but the default is page 1
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  // Calculate the total number of records without applying limit and offset
  const countQuery = `SELECT COUNT(*) AS total FROM users WHERE 1=1${search ? ` AND (name LIKE '%${search}%' OR email LIKE '%${search}%')` : ''}`;
  const countResult = await request.query(countQuery);

  var totalusers = countResult.recordset[0].total;
  const numOfPages = Math.ceil(totalusers / limit);

  if (totalusers == 0) {
    totalusers = 1;
  }

  // Add pagination (LIMIT and skip) to the main SQL query
  sqlQuery += ` OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY`;

  /********************************* 
   * send back json response
   *********************************/

  request.query(sqlQuery, (err, result) => {
    if (err) throw err;
    const userData = result.recordset;
    res.status(StatusCodes.OK).json({ totalusers, numOfPages, currentPage: page, users: userData })
  });
}

// Edit user
export const updateUser = async (req, res) => {
  var request = new mssql.Request()
  const userId = req.params.id;
  const q = "UPDATE users SET [name]=@name, birthday=@birthday, gender=@gender, department=@department, updatedAt=current_timestamp WHERE id=@userId"
  // const values = [
  //   req.body.name,
  //   req.body.birthday,
  //   req.body.gender,
  //   req.body.department,
  // ]
  request.input('name', mssql.VarChar, req.body.name);
  request.input('birthday', mssql.VarChar, req.body.birthday);
  request.input('gender', mssql.VarChar, req.body.gender);
  request.input('department', mssql.VarChar, req.body.department);
  request.input('userId', mssql.Int, userId);

  request.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
    return res.json("User has been updated.");
  })
}

