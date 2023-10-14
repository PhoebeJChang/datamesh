import mongoose from "mongoose";

const MedCaseSchema = new mongoose.Schema(
  {
    hospital_id: Number,
    hospital_name: String,
    chart_no: Number,
    patient_name: String,
    patient_gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
    },
    id_number: String,
    birth_date: String,
    birth_place: String,
    weight: Number,
    current_address: String,
    profession: String,
    work_unit: String,
    contact_information: String,
    admitting_time: String,
    inf_recording_time: String,
    history_recorder: String,
  },
  { timestamps: true }
);

export default mongoose.model('MedCase', MedCaseSchema);