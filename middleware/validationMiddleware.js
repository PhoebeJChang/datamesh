/*************************
 * This file is for all the validate info
 * look "models" as a guidlines 
 *************************/

import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import mongoose, { Mongoose } from 'mongoose';
import MedCase from '../models/MedCaseModel.js';
import User from '../models/UserModel.js'
import BasicInfo from '../models/BasicInfoModel.js';


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
 * BasicInfo validators
 **************************/
export const validateBasicInfoInput = withValidationErrors([
  body('medical_history_no')
    .notEmpty()
    .withMessage('medical history number is required')
    .isLength({
      min: 8,
      max: 8
    })
    .withMessage('invalid medical history number format')
    .isNumeric()
    .withMessage('invalid medical history number format')
    //check the id is unique or not
    .custom(async (medical_history_no) => {
      const patient_medical = await BasicInfo.findOne({ medical_history_no })
      if (patient_medical) {
        throw new BadRequestError('medical history number already exists');
      }
    }),

  body('id_number')
    .notEmpty()
    .withMessage('id number is required')
    .isLength(10)
    .withMessage('invalid id number format')
    //check the id is unique or not
    .custom(async (id_number) => {
      const patient_id = await BasicInfo.findOne({ id_number })
      if (patient_id) {
        throw new BadRequestError('id number already exists');
      }
    }),

  body('name')
    .notEmpty()
    .withMessage('name is required'),

  body('gender')
    .notEmpty()
    .withMessage('gender is required'),

  body('birth_date')
    .notEmpty()
    .withMessage('birth date is required')
    .isDate()
    .withMessage('invalid birthday format'),

  body('height')
    .notEmpty()
    .withMessage('height is required')
    .isNumeric()
    .withMessage('invalid height format'),

  body('weight')
    .notEmpty()
    .withMessage('weight is required')
    .isNumeric()
    .withMessage('invalid weight format'),

  body('address')
    .notEmpty()
    .withMessage('address is required'),

  body('phone')
    .notEmpty()
    .withMessage('phone is required')
    .isMobilePhone('zh-TW')
    .withMessage('invalid phone format'),

  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    //check the email is unique or not
    .custom(async (email) => {
      const user_email = await BasicInfo.findOne({ email })
      if (user_email) {
        throw new BadRequestError('email already exists');
      }
    }),

  body('profession')
    .notEmpty()
    .withMessage('profession is required'),

  //NEED TO CHANGE LATER (changed)
  body('history_recorder')
  // .notEmpty()
  // .withMessage('history recorder is required')
]);

export const validateIdParams = withValidationErrors([
  param('id')
    .isLength({
      min: 6,
      max: 6
    })
    .withMessage('invalid id format')
    .isNumeric()
    .withMessage('invalid id format')
    .custom(async (id) => {
      const user = await BasicInfo.findOne({ id })
      if (!user) {
        throw new NotFoundError(`no patient with medical_history_no ${id}`)
      }
    })
]);

export const validateMedHISParams = withValidationErrors([
  param('medical_history_no')
    .isLength({
      min: 8,
      max: 8
    })
    .withMessage('invalid id format')
    .isNumeric()
    .withMessage('invalid id format')
    .custom(async (medical_history_no) => {
      const user = await MedCase.findOne({ medical_history_no })
      if (!user) {
        throw new NotFoundError(`no patient with medical_history_no ${medical_history_no}`)
      }
    })
]);

export const validateMDParams = withValidationErrors([
  param('medical_history_no')
    .isLength({
      min: 8,
      max: 8
    })
    .withMessage('invalid medical history number format')
    .isNumeric()
    .withMessage('invalid medical history number format')
    .custom(async (medical_history_no) => {
      const patient = await BasicInfo.findOne({ medical_history_no })
      if (!patient) {
        throw new NotFoundError(`no patient with medical_history_no ${medical_history_no}`)
      }
    })
]);

/**************************
 * Register validation
 **************************/
export const validateRegisterInput = withValidationErrors([
  body('id')
    .notEmpty()
    .withMessage('id is required')
    .isLength({
      min: 6,
      max: 6
    })
    .withMessage('invalid id format')
    .isNumeric()
    .withMessage('invalid id format')
    //check the id is unique or not
    .custom(async (id) => {
      const user_id = await User.findOne({ id })
      if (user_id) {
        throw new BadRequestError('id already exists');
      }
    }),

  body('name')
    .notEmpty()
    .withMessage('name is required'),

  body('phone')
    .notEmpty()
    .withMessage('phone is required')
    .isMobilePhone('zh-TW')
    .withMessage('invalid phone format'),

  body('birthday')
    .notEmpty()
    .withMessage('birthday is required')
    .isDate()
    .withMessage('invalid birthday format'),

  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    //check the email is unique or not
    .custom(async (email) => {
      const user_email = await User.findOne({ email })
      if (user_email) {
        throw new BadRequestError('email already exists');
      }
    }),

  body('gender')
    .notEmpty()
    .withMessage('gender is required'),

  body('department')
    .notEmpty()
    .withMessage('department is required'),

  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0
    })
    .withMessage('invalid password format')
])

/**************************
 * Login validation
 **************************/
export const validateLoginInput = withValidationErrors([
  // body('email')
  //   .notEmpty()
  //   .withMessage('email is required')
  //   .isEmail()
  //   .withMessage('invalid email format'),
  body('id')
    .notEmpty()
    .withMessage('請填寫醫師編號')
    .isLength({
      min: 6,
      max: 6
    })
    .withMessage('醫師編號須為6碼')
    .isNumeric()
    .withMessage('錯誤的格式'),

  body('password')
    .notEmpty()
    .withMessage('請輸入密碼')
])

/**************************
 * Update user validation (almost the same as register)
 **************************/
export const validateUpdateUserInput = withValidationErrors([

  body('name')
    .notEmpty()
    .withMessage('name is required'),

  body('phone')
    .notEmpty()
    .withMessage('phone is required')
    .isMobilePhone('zh-TW')
    .withMessage('invalid phone format'),

  body('birthday')
    .notEmpty()
    .withMessage('birthday is required')
    .isDate()
    .withMessage('invalid birthday format'),

  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    //check the email is unique or not
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email })
      // need to double check
      if (user && user.id !== req.user.userId) {
        throw new BadRequestError('email already exists');
      }
    }),

  body('gender')
    .notEmpty()
    .withMessage('gender is required'),

  body('department')
    .notEmpty()
    .withMessage('department is required'),
]);