import basic_inf from '../models/BasicInfModel.js';
import { StatusCodes } from 'http-status-codes';

//Get all basic inf
export const getAllBasic = async (req, res) => {
  const basic = await basic_inf.find({});
  res.status(StatusCodes.OK).json({ basic });
};

//create basic
export const createBasic = async (req, res) => {

  //it should follow the schema in MedCaseModel
  const basic = await basic_inf.create(req.body);
  res.status(StatusCodes.CREATED).json({ basic });

}

// GET SINGLE basic
// get basic inf on chart_no
export const getBasic = async (req, res) => {
  const basic = await basic_inf.findById(req.params.chart_no);

  console.log(basic);
  
  res.status(StatusCodes.OK).json({ basic });
}

// EDIT basic
export const updateBasic = async (req, res) => {
  const updatedBasic = await User.findByIdAndUpdate(req.params.chart_no, req.body, {
    new: true
  })
  

  res.status(StatusCodes.OK).json({ msg: 'Basic_inf modified', basic: updatedUser });
}

// DELETE basic
export const deleteBasic = async (req, res) => {
  const removeBasic = await User.findByIdAndDelete(req.params.chart_no);

  res.status(StatusCodes.OK).json({ msg: 'Users deleted', basic: removeBasic });
}
