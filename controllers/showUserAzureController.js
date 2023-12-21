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

  const queryObject = {
    //only show the info created by the current user
    // history_recorder: req.user.userId,
  }

  if (search) {
    // Convert the search string to a number for querying
    const numericSearch = parseInt(search);

    if (!isNaN(numericSearch)) {
      // If successfully converted the search string to a number, use it in the query
      queryObject.id = numericSearch;
    } else {
      // If unable to convert the search string to a number, you can handle errors or perform other actions
    }
  }

  const sortOptions = {
    ascending: 'id',
    descending: '-id',
  };

  //if client didn't select specific way, default will
  const sortKey = sortOptions[sort] || sortOptions.ascending;

  /*********************************
   * setup for pagination
   *********************************/
  var totalusers = 0;

  // get the current page from client but the default is page 1
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  /*********************************
   * send back json response
   *********************************/

  request.query("select * from users", (err, result) => {
    if (err) throw err;
    const userData = result.recordset;
    totalusers = userData.length
    const numOfPages = Math.ceil(totalusers / limit);
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

