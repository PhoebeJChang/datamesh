import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import BasicInfo from '../models/BasicInfoModel.js';

//get actual user insteadd of token and cookies
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

// this is an admin route (but we haven't setup admin yet)
export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'application stats' });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  // make sure our user password didn't add to our update user function
  delete obj.password;
  console.log("OBJ",obj);
  const updatedUser = await User.findByIdAndUpdate(req.user.id, obj);
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};