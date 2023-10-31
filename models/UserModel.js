import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required!']
  },
  password: {
    type: String,
    required: [true, 'password is required!']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: [true, 'role is required!']
  },
  user_gender: {
    type: String,
    enum: ['男','女'],
    default: '男',
    required: [true, 'user_gender is required!']
  },
  departmen: {
    type: String,
    required: [true, 'department is required!']
  },
  ts:{
    type: Date,
    default: Date.now
  }
  },
);

export default mongoose.model('User', UserSchema, 'User')