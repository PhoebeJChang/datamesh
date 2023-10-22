/*************************
 * This file is for all the validate info
 * look "models" as a guidlines 
 *************************/

import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import mongoose from 'mongoose';
import MedCase from '../models/MedCaseModel.js';
import User from '../models/UserModel.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        console.log("ERRORMMM ", errorMessages[0])
        if (errorMessages[0].startsWith('Invalid MongoDB')) { // it should be noy found will be better
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

/**************************
 * Medcase validators
 **************************/
export const validateMedCaseInput = withValidationErrors([
  body('hospital_id').notEmpty().withMessage('hospital id is required'),
  body('hospital_name').notEmpty().withMessage('hospital name is required'),
  body('chart_no').notEmpty().withMessage('chart no is required'),
  body('patient_name').notEmpty().withMessage('patient name is required'),
  body('patient_gender').notEmpty().withMessage('patient gender is required'),
  body('id_number').notEmpty().withMessage('id number is required'),
  body('birth_date').notEmpty().withMessage('birth date is required'),
  body('birth_place').notEmpty().withMessage('birth place is required'),
  body('weight').notEmpty().withMessage(' is required'),
  body('current_address').notEmpty().withMessage(' is required'),
  body('profession').notEmpty().withMessage(' is required'),
  body('work_unit').notEmpty().withMessage(' is required'),
  body('contact_information').notEmpty().withMessage(' is required'),
  body('admitting_time').notEmpty().withMessage(' is required'),
  body('inf_recording_time').notEmpty().withMessage(' is required'),
  body('history_recorder').notEmpty().withMessage(' is required'),
]);

export const validateIdParams = withValidationErrors([
  param('id_number')
    .custom(async (value) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidId) {
        throw new BadRequestError('Invalid MongoDB id');
      }
      const medCase = await MedCase.findById(value);//id_number

      console.log(medCase);
      //if there is no medCase/patient
      if (!medCase) {
        throw new NotFoundError(`no medCase with id_number ${value}`)
      }
    }),
]);

//register validation
export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    //check the email is uniquemor not
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be atleast 8 character long')
])

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
    
  body('password')
    .notEmpty()
    .withMessage('password is required')
])