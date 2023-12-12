//this file is for MedCase default value
//use this file to cuatomize value if we want
export const MEDCASE_SOMECONDITION = {

}

//9-86
//also see the validatorMiddelware 9-87

export const BASICINFO_GENDER = {
  MALE: '男',
  FEMALE: '女',
  THEY: '其他',
};

export const DEPARTMENT ={
  // 內科
  Cardiology: "心臟內科",
  Pulmonology: "胸腔內科",
  Nephrology: "腎臟科",
  Infectious_Diseases: "感染科",
  astroenterology_and_Hepatology: "胃腸肝膽科",
  Hematology_and_Oncology: "血液腫瘤科",
  Endocrinology_and_Diabetes: "內分泌及糖尿病科",
  // Allergy, Immunology, and Rheumatology
  AIR: "過敏免疫風濕科",

  // 外科
  Cardiovascular_Surgery: "心臟血管外科",
  Thoracic_Surgery: "胸腔外科",
  Neurosurgery: "神經外科",
  Pediatric_Surgery: "小兒外科",
  Urology: "泌尿科",
  General_Surgery: "一般外科",
  Plastic_Surgery: "整型外科",
  Traumatology: "外傷科",

  //其他專科
  Emergency_Medicine: "急診醫學科",
  Family_Medicine: "家庭醫學科",
  Occupational_Medicine: "職業醫學科",
  Obstetrics_and_Gynecology: "婦產科",
  Pediatrics: "小兒科",
  Dermatology: "皮膚科",
  // Otorhinolaryngology (ENT)
  Otorhinolaryngology: "耳鼻喉頭頸科",
  Ophthalmology: "眼科",
  Dentistry: "牙科",
  Rehabilitation_Medicine: "復健科",
  Psychiatry: "精神科",
  Orthopedics: "骨科",
  Neurology: "神經科",
  Internal_Medicine: "一般醫學科",
  Anesthesiology: "麻醉科",
  Vascular_Medicine: "周邊血管科",
  Traditional_Chinese_Medicine: "中醫科"
};

export const BASICINFO_SORT_BY = {
  // ASC = ASCENDING
  // DES = DESCENDING
  MED_ASCENDING: 'ascending',
  MED_DESCENDING: 'descending',
  ID_NUM_ASC: 'a-z',
  ID_NUM_DES: 'z-a'
};