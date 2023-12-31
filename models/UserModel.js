import mongoose from "mongoose"
import { BASICINFO_GENDER, DEPARTMENT } from "../utils/constance.js";

const UserSchema = new mongoose.Schema({
  id: Number, //醫生代碼
  name: String,
  phone: Number,
  email: String,
  birthday: String,
  gender: {
    type: String,
    enum: Object.values(BASICINFO_GENDER)
  },
  department: {
    type: String,
    enum: Object.values(DEPARTMENT)
    // ['心臟內科', '胸腔內科', '腎臟科', '感染科', '胃腸肝膽科', '血液腫瘤科', '內分泌及糖尿病科', '過敏免疫風濕科', //內科
    // '心臟血管外科', '胸腔外科', '神經外科', '小兒外科', '泌尿科', '一般外科', '整型外科', '外傷科', //外科
    // '急診醫學科', '家庭醫學科', '職業醫學科', '婦產科', '小兒科', '皮膚科', '耳鼻喉頭頸科', '眼科', '牙科', '復健科', '精神科', '骨科', '神經科', '一般醫學科', '麻醉科', '周邊血管科', '中醫科'] // 其他專科
  },
  password: String,
},
  {
    timestamps: true
  });

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('users', UserSchema)