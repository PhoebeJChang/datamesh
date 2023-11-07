import mongoose from "mongoose";

const BasicInfSchema = new mongoose.Schema({
  medical_history_no: Number,
  id_number: String, 
  name: String,
  gender: {
      type: String,
      enum: ['男', '女', '其他']
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