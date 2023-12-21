import { StatusCodes } from "http-status-codes";
import { mysql_config } from "../server.js"
import express from 'express'

//get all users
export const getAllUsers = async (req, res) => {

  /*********************************
   * for searching and sorting
   *********************************/
  const { search, sort } = req.query;

  // Define the base SQL query
  let sqlQuery = "SELECT * FROM users WHERE 1=1"; // Start with a basic query

  // Add filtering
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
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  // Calculate the total number of records without applying limit and offset
  const countQuery = `SELECT COUNT(*) AS total FROM users WHERE 1=1${search ? ` AND (name LIKE '%${search}%' OR email LIKE '%${search}%')` : ''}`;

  // Execute the countQuery to get the total count of users
  mysql_config.query(countQuery, (err, countResult) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
      return;
    }

    var totalusers = countResult[0].total;

    if (totalusers == 0) {
      totalusers = 1;
    }

    // Add pagination (LIMIT and OFFSET) to the main SQL query
    sqlQuery += ` LIMIT ${limit} OFFSET ${skip}`;

    // Execute the sqlQuery to fetch paginated user data
    mysql_config.query(sqlQuery, (err, users) => {
      if (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
        return;
      }

      const numOfPages = Math.ceil(totalusers / limit);
      res.status(StatusCodes.OK).json({ totalusers, numOfPages, currentPage: page, users });
    });
  });
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
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' })
    }
    return res.json("User has been updated.")
  })

}

