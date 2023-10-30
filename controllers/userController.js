import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';

//Get all users
export const getAllUser = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};

//create user
export const createUser = async (req, res) => {

  //it should follow the schema in MedCaseModel
  const users = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ users });

}

// GET SINGLE user
// get user on name
export const getUser = async (req, res) => {
  const users = await User.findById(req.params.name);

  console.log(users);
  
  res.status(StatusCodes.OK).json({ users });
}

// EDIT user
export const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.name, req.body, {
    new: true
  })
  

  res.status(StatusCodes.OK).json({ msg: 'Users modified', users: updatedUser });
}

// DELETE user
export const deleteUser = async (req, res) => {
  const removeUser = await User.findByIdAndDelete(req.params.name);

  res.status(StatusCodes.OK).json({ msg: 'Users deleted', users: removeMedCase });
}
