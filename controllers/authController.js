import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { checkPassword, hashPassword } from "../utils/passwordUtils.js";



export const register = async (req, res) => {
  // first registered user is an admin
  // const isFirstAccount = (await User.countDocuments()) === 0;
  // req.body.role = isFirstAccount ? 'admin' : 'user';

  // the password hash is in the utils file
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  //if you want to test the api, use json({user})
  res.status(StatusCodes.CREATED).json({ msg: 'User Created' });
}
export const login = async (req, res) => {
  const hashedPassword = (await User.findOne({id: req.body.id}, 'password')).password;
  const checkedRes = await checkPassword(req.body.password, hashedPassword);
  if (checkedRes) {
    res.status(StatusCodes.OK).json({ msg: 'Login Sucessed' });
  }
  else {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Login Failed' });
  }
}

export const getAllUsers = async (req, res) => {
  const basicInfos = await User.find({});
  res.status(StatusCodes.OK).json({ basicInfos });
};

export const getUser = async (req, res) => {
  const basicInfo = await User.findOne({id: req.params.id})  
  res.status(StatusCodes.OK).json({ basicInfo });
}

// EDIT User
export const updateUser = async (req, res) => {
  const updatedUser = await User.findOneAndUpdate({id: req.params.id}, req.body, {
    new: true
  })
  res.status(StatusCodes.OK).json({ msg: 'User Updated' });
}

// DELETE User
export const deleteUser = async (req, res) => {
  const removeUser = await User.findOneAndDelete({id: req.params.id});
  res.status(StatusCodes.OK).json({ msg: 'User Deleted'});
}