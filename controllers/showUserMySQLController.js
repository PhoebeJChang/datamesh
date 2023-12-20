import { StatusCodes } from "http-status-codes";
import mysql_config from "../server.js"
import express from 'express'

//get all users
export const getAllUsers = async (req, res) => {

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
  var jsonObject = mysql_config.query("SELECT * FROM users");

  totalusers = (Object.keys(jsonObject).length) / 9

  // get the current page from client but the default is page 1
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  console.log('page', page)

  /*********************************
   * send back json response
   *********************************/
  const numOfPages = Math.ceil(totalusers / limit);

  mysql_config.query("SELECT * FROM users", (err, users) => {
    if (err) throw err
    res.status(StatusCodes.OK).json({ totalusers, numOfPages, currentPage: page, users });
  })

}

// Edit user
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE users SET `name`=?,`birthday`=?,`gender`=?,`department`=?, `updatedAt`= current_timestamp(6) WHERE id=?"
  const values = [
    req.body.name,
    req.body.birthday,
    req.body.gender,
    req.body.department,

  ]
  mysql_config.query(q, [...values, userId], (err, data) => {
    if (err) return res.json(err)
    return res.json("User has been updated.")
  })

}

