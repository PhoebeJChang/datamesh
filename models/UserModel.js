import mongoose from "mongoose"
import moment from "moment-timezone";

const dateTaipei = moment.tz(Date.now(), "Asia/Taipei");
console.log(dateTaipei);

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date, 
    default: dateTaipei
  },
  updatedAt: {
    type: Date, 
    default: dateTaipei
  }
});

export default mongoose.model('User', UserSchema)