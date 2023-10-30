import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const register = async (req, res) => {
  // first registered user is an admin
  // const isFirstAccount = (await User.countDocuments()) === 0;
  // req.body.role = isFirstAccount ? 'admin' : 'user';


  // the password hash is in the utils file
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body)
  //if you want to test the api, use json({user})
  res.status(StatusCodes.CREATED).json({ msg: 'User created' });
}
export const login = async (req, res) => {
  res.send('login');
}