import { response } from 'express';
import BasicInfo from '../models/BasicInfoModel.js';
import { StatusCodes } from 'http-status-codes';

//Get all BasicInfo
export const getAllBasicInfos = async (req, res) => {
  // console.log(req)
  // find({ history_recorder: req.user.userId })
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query) || 4;
  const skip = (page - 1) * limit;
  const basicInfos = await BasicInfo.find().skip(skip).limit(limit);
  res.status(StatusCodes.OK).json({ basicInfos });
};

//create BasicInfo
export const createBasicInfo = async (req, res) => {
  //it should follow the schema in BasicInfoModel
  console.log("reqqq", req.user)
  req.body.history_recorder = req.user.userId;
  const basicInfo = await BasicInfo.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'Patient Created'});
}

// GET SINGLE BasicInfo
export const getBasicInfo = async (req, res) => {
  const basicInfo = await BasicInfo.findOne({medical_history_no: req.params.medical_history_no})  
  res.status(StatusCodes.OK).json({ basicInfo });
}

// EDIT BasicInfo
export const updateBasicInfo = async (req, res) => {
  const updatedBasicInfo = await BasicInfo.findOneAndUpdate({medical_history_no: req.params.medical_history_no}, req.body, {
    new: true
  })
  res.status(StatusCodes.OK).json({ msg: 'BasicInfo Updated' });
}

// DELETE BasicInfo
export const deleteBasicInfo = async (req, res) => {
  const removeBasicInfo = await BasicInfo.findOneAndDelete({medical_history_no: req.params.medical_history_no});
  res.status(StatusCodes.OK).json({ msg: 'BasicInfo Deleted'});
}
