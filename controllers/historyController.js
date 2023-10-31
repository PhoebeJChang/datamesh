import Historys from '../models/HistoryModel.js';
import { StatusCodes } from 'http-status-codes';

//Get all basic inf
export const getAllHistory = async (req, res) => {
  const history = await Historys.find({});
  res.status(StatusCodes.OK).json({ history });
};

//create basic
export const createHistory = async (req, res) => {

  //it should follow the schema in MedCaseModel
  const history = await Historys.create(req.body);
  res.status(StatusCodes.CREATED).json({ history });

}

// GET SINGLE basic
// get basic inf on chart_no
export const getHistory = async (req, res) => {
  const history = await Historys.findById(req.params.chart_no);

  console.log(history);
  
  res.status(StatusCodes.OK).json({ history });
}

// EDIT basic
export const updateHistory = async (req, res) => {
  const updatedHistory = await Historys.findByIdAndUpdate(req.params.chart_no, req.body, {
    new: true
  })
  

  res.status(StatusCodes.OK).json({ msg: 'History modified', history: updatedHistory });
}

// DELETE basic
export const deleteHistory = async (req, res) => {
  const removeHistory = await Historys.findByIdAndDelete(req.params.chart_no);

  res.status(StatusCodes.OK).json({ msg: 'History deleted', history: removeHistory });
}
