import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    chart_no:{
        type: Number,
        unique: true, // primary key
        required: [true, 'chart no is required!']
    },
    chief_complaint:{
        type: String,
        required: [true, 'chief complaint is required!']
    },
    sickness_onset:{
        type: String,
        required: [true, 'sickness onset is required!']
    },
    cardinal_symptom:{
      type: String,
      required: [true, 'cardinal symptom is required!']
  },
    evolution:{
      type: Date,
      required: [true, 'evolution is required!']
  },
    accompanying_symptoms:{
      type: String,
      required: [true, 'accompanying symptoms is required!']
  },
    treatment_process:{
      type: Number,
      required: [true, 'treatment process is required!']
  },
    general_conditions:{
      type: String,
      required: [true, 'general conditions is required!']
  },
    ts:{
      type: Date,
      default: Date.now
    }
  },
);

export default mongoose.model('Historys', HistorySchema,'Historys');