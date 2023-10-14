import MedCase from '../models/MedCaseModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

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
  const { id_number } = req.params;

  const medCase = await MedCase.findById(id_number);
  console.log(medCase);
  //if there is no medCase
  if (!medCase) {
    throw new NotFoundError(`no medCase with id_number ${id_number}`)
  }
  res.status(StatusCodes.OK).json({ medCase });
}

// EDIT MedCase
export const updateMedCase = async (req, res) => {
  const { id_number } = req.params;

  const updatedMedCase = await MedCase.findByIdAndUpdate(id_number, req.body, {
    new: true
  })
  if (!updatedMedCase) {
    throw new NotFoundError(`no medCase with id_number ${id_number}`)
  }

  res.status(StatusCodes.OK).json({ msg: 'medCase modified', medCase: updatedMedCase });
}

// DELETE medCase
export const deleteMedCase = async (req, res) => {
  const { id_number } = req.params;
  const removeMedCase = await MedCase.findByIdAndDelete(id_number);
  if (!removeMedCase) {
    throw new NotFoundError(`no medCase with id_number ${id_number}`)
  }

  res.status(StatusCodes.OK).json({ msg: 'MedCase deleted', medCase: removeMedCase });
}
