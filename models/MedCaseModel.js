import mongoose from "mongoose";

const BasicInfSchema = new mongoose.Schema( 
  {
    hospital_id:{
      type: Number,
      required: [true, 'hospital id is required!'] // not null
    },
    hospital_name:{
      type: String,
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
      required: [true, 'birth place is required!']
  },
    weight:{
      type: Number,
      required: [true, 'weight is required!']
  },
    current_address:{
      type: String,
      required: [true, 'current address is required!']
  },
    profession:{
      type: String,
      required: [true, 'profession is required!']
  },
    work_unit:{
      type: String,
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
      required: [true, 'history recorder is required!']
  },
    ts:{
      type: Date,
      default: Date.now
    }
  },
);
BasicInfSchema.pre("updateOne", function(next) {
  this.update({}, { $set: { timestamp: new Date() } });
  next();
});

export default mongoose.model('MedCase', BasicInfSchema);