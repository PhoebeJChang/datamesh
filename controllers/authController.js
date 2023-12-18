import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { checkPassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";


/**************************
 * Register control
 **************************/
export const register = async (req, res) => {
  // first registered user is an admin
  // const isFirstAccount = (await User.countDocuments()) === 0;
  // req.body.role = isFirstAccount ? 'admin' : 'user';

  // the password hash is in the utils file
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  console.log(req.body);
  //if you want to test the api, use json({user})
  res.status(StatusCodes.CREATED).json({ msg: 'User Created' });
}

/**************************
 * Login control
 **************************/
export const login = async (req, res) => {
  // check if the user exist
  const user = await User.findOne({ id: req.body.id })
  if (!user) {
    throw new UnauthenticatedError('醫師編號不存在或註冊')
  }

  const checkedRes = await checkPassword(req.body.password, user.password);
  if (!checkedRes) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: '登入失敗:密碼錯誤' });
  }

  const token = createJWT({ userId: user.id });

  // set the token expire time
  const twoDay = 1000 * 60 * 60 * 24 * 2;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + twoDay),
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.CREATED).json({ msg: '登入成功' });
}

/**************************
 * Logout control
 **************************/
export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

/**************************
 * User APIs
 **************************/
//Get all User
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
  const totalusers = await User.countDocuments(queryObject);
  console.log(totalusers)

  // get the current page from client but the default is page 1
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;


  /*********************************
   * send back json response
   *********************************/
  const users = await User.find(queryObject).sort(sortKey).skip(skip).limit(limit);
  const numOfPages = Math.ceil(totalusers / limit);
  res.status(StatusCodes.OK).json({ totalusers, numOfPages, currentPage: page, users });
};

// GET SINGLE User
export const getUser = async (req, res) => {
  const singleUser = await User.findOne({ id: req.params.id })
  res.status(StatusCodes.OK).json({ singleUser });
}

// EDIT User
export const updateUser = async (req, res) => {
  const updatedUser = await User.findOneAndUpdate({ id: req.params.id }, req.body, {
    new: true
  })
  res.status(StatusCodes.OK).json({ msg: 'User Updated' });
}

// DELETE User
export const deleteUser = async (req, res) => {
  const removeUser = await User.findOneAndDelete({ id: req.params.id });
  res.status(StatusCodes.OK).json({ msg: 'User Deleted' });
}