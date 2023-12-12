import BasicInfo from '../models/BasicInfoModel.js';
import { StatusCodes } from 'http-status-codes';

//Get all BasicInfo
export const getAllBasicInfos = async (req, res) => {

  /*********************************
   * for searching and sorting
   *********************************/
  const { search, sort } = req.query;

  const queryObject = {
    //only show the info created by the current user
    // history_recorder: req.user.userId,
  }

  if (search) {
    //'&or' from mongo syntax
    queryObject.$or = [
      { id_number: { $regex: search, $options: 'i' } },
      // add more search query if we need in the future
    ]
  }

  const sortOptions = {
    ascending: 'medical_history_no',
    descending: '-medical_history_no',
    'a-z': 'id_number',
    'z-a': '-id_number'
  };

  //if client didn't select specific way, default will
  const sortKey = sortOptions[sort] || sortOptions.ascending;

  /*********************************
   * setup for pagination
   *********************************/
  const totalBasicInfos = await BasicInfo.countDocuments(queryObject);
  console.log(totalBasicInfos)

  // get the current page from client but the default is page 1
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page-1) * limit;

  /*********************************
   * send back json response
   *********************************/
  const basicInfos = await BasicInfo.find(queryObject).sort(sortKey).skip(skip).limit(limit);
  const numOfPages = Math.ceil(totalBasicInfos/limit);
  res.status(StatusCodes.OK).json({ totalBasicInfos, numOfPages, currentPage: page, basicInfos });
};

//create BasicInfo
export const createBasicInfo = async (req, res) => {
  //it should follow the schema in BasicInfoModel
  console.log("reqqq", req.user)
  req.body.history_recorder = req.user.userId;
  const basicInfo = await BasicInfo.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'Patient Created' });
}

// GET SINGLE BasicInfo
export const getBasicInfo = async (req, res) => {
  const basicInfo = await BasicInfo.findOne({ medical_history_no: req.params.medical_history_no })
  res.status(StatusCodes.OK).json({ basicInfo });
}

// EDIT BasicInfo
export const updateBasicInfo = async (req, res) => {
  const updatedBasicInfo = await BasicInfo.findOneAndUpdate({ medical_history_no: req.params.medical_history_no }, req.body, {
    new: true
  })
  res.status(StatusCodes.OK).json({ msg: 'BasicInfo Updated' });
}

// DELETE BasicInfo
export const deleteBasicInfo = async (req, res) => {
  const removeBasicInfo = await BasicInfo.findOneAndDelete({ medical_history_no: req.params.medical_history_no });
  res.status(StatusCodes.OK).json({ msg: 'BasicInfo Deleted' });
}
