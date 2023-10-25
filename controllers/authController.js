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
  const user = await User.create(req.body)
  //if you want to test the api, use json({user})
  res.status(StatusCodes.CREATED).json({ msg: 'User Created' });
}
export const login = async (req, res) => {
  const hashedPassword = await User.findOne({email:req.body.email}, 'password').password;
  const checkPassword = await checkPassword(hashedPassword, req.body.password);
  if (checkPassword) {
    res.status(StatusCodes.OK).json({ msg: 'Login Sucessed' });
  }
  else {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Login Failed' });
  }
}