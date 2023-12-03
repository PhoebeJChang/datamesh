import mongoose from "mongoose";

const MedCaseSchema = new mongoose.Schema({
  medical_history_no: Number,
  chief_complaint: String, 
  symptoms: String,
  treatment_process: String,
},
// {
//   timestamps: true
// }
);

export default mongoose.model('medcases', MedCaseSchema);