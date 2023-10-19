import MedCase from '../models/MedCaseModel.js';
import { StatusCodes } from 'http-status-codes';

//Get all cases
export const getAllMedCases = async (req, res) => {
  const medCases = await MedCase.find({});
  res.status(StatusCodes.OK).json({ medCases });
};

//create medCase
export const createMedCase = async (req, res) => {

  //it should follow the schema in MedCaseModel
  const medCase = await MedCase.create(req.body);
  res.status(StatusCodes.CREATED).json({ medCase });

}

// GET SINGLE medCase
// get medCase base on id_number
export const getMedCase = async (req, res) => {
  const medCase = await MedCase.findById(req.params.id_number);

  console.log(medCase);
  
  res.status(StatusCodes.OK).json({ medCase });
}

// EDIT MedCase
export const updateMedCase = async (req, res) => {
  const updatedMedCase = await MedCase.findByIdAndUpdate(req.params.id_number, req.body, {
    new: true
  })
  

  res.status(StatusCodes.OK).json({ msg: 'medCase modified', medCase: updatedMedCase });
}

// DELETE medCase
export const deleteMedCase = async (req, res) => {
  const removeMedCase = await MedCase.findByIdAndDelete(req.params.id_number);

  res.status(StatusCodes.OK).json({ msg: 'MedCase deleted', medCase: removeMedCase });
}
