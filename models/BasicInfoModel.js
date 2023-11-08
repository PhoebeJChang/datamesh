import mongoose from "mongoose";
import { BASICINFO_GENDER } from "../utils/constance.js";

const BasicInfSchema = new mongoose.Schema({
  medical_history_no: Number,
  id_number: String, 
  name: String,
  gender: {
      type: String,
      enum: Object.values(BASICINFO_GENDER),
      default: BASICINFO_GENDER.MALE
  }, 
  birth_date: Date, 
  height: Number,
  weight: Number,
  address: String,
  phone: Number,
  email: String,
  profession: String,
  history_recorder: String
},
{
  timestamps: true
}
);

export default mongoose.model('basic_infos', BasicInfSchema);