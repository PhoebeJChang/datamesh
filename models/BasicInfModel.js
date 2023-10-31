import mongoose from "mongoose";

const BasicInfSchema = new mongoose.Schema(
  {
    hospital_id:{
      type: Number,
      default: 1101150011,
      required: [true, 'hospital id is required!'] // not null
    },
    hospital_name:{
      type: String,
      default: "新光醫療財團法人新光吳火獅紀念醫院",
      required: [true, 'hospital name is required!']
    },
    chart_no:{
        type: Number,
        unique: true, // primary key
        required: [true, 'chart no is required!']
    },
    patient_name:{
        type: String,
        required: [true, 'patient name is required!']
    },
    patient_gender:{
        type: String,
        required: [true, 'patient gender is required!']
    },
    id_number:{
      type: String,
      required: [true, 'id number is required!']
  },
    birth_date:{
      type: Date,
      required: [true, 'birth date is required!']
  },
    birth_place:{
      type: String,
      default: "新光醫療財團法人新光吳火獅紀念醫院",
      required: [true, 'birth place is required!']
  },
    weight:{
      type: Number,
      required: [true, 'weight is required!']
  },
    current_address:{
      type: String,
      default: "輔仁大學",
      required: [true, 'current address is required!']
  },
    profession:{
      type: String,
      required: [true, 'profession is required!']
  },
    work_unit:{
      type: String,
      default: "無",
      required: [true, 'work unit is required!']
  },
    contact_information:{
      type: String,
      required: [true, 'contact information is required!']
  },
    admitting_time:{
      type: String,
      required: [true, 'admitting time is required!']
  },
    history_recorder:{
      type: String,
      default: "王小明",
      required: [true, 'history recorder is required!']
  },
    ts:{
      type: Date,
      default: Date.now
    }
  },
);

export default mongoose.model('Basicinf', BasicInfSchema,'Basicinf');