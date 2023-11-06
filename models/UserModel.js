import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  id: Number, //醫生代碼
  name: String,
  phone: Number,
  email: String,
  birthday: Date,
  gender: {
    type: String,
    enum: ['男', '女', '其他']
  }, 
  department: {
    type: String,
    enum: ['心臟內科', '胸腔內科', '腎臟科', '感染科', '胃腸肝膽科', '血液腫瘤科', '內分泌及糖尿病科', '過敏免疫風濕科', //內科
    '心臟血管外科', '胸腔外科', '神經外科', '小兒外科', '泌尿科', '一般外科', '整型外科', '外傷科', //外科
    '急診醫學科', '家庭醫學科', '職業醫學科', '婦產科', '小兒科', '皮膚科', '耳鼻喉頭頸科', '眼科', '牙科', '復健科', '精神科', '骨科', '神經科', '一般醫學科', '麻醉科', '周邊血管科', '中醫科'] // 其他專科
  }, 
  password: String,
  // createdAt: {
  //   type: Date,
  //   default: moment.tz(Date.now(), "Asia/Taipei")
  // }, 
  // updatedAt: {
  //   type: Date,
  //   default: moment.tz(Date.now(), "Asia/Taipei")
  // }
  // role: {
  //   type: String,
  //   enum: ['user', 'admin'],
  //   default: 'user'
  // }
},
{
  timestamps: true
}
);

export default mongoose.model('users', UserSchema)