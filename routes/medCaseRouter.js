import { Router } from 'express';
import { validateMedHISParams,validateMDParams, } from '../middleware/validationMiddleware.js';
const router = Router();

import {
  // getAllMedCases,
  // createMedCase,
  // getMedCase,
  getSingleMedCase,
  // updateMedCase,
  // deleteMedCase
} from '../controllers/medCaseController.js'

// router.route('/').get(getAllMedCases).post(validateMedCaseInput, createMedCase);
router
  .route('/:medical_history_no')
  // .get(validateIdParams, getSingleMedCase)
  .get(validateMedHISParams, getSingleMedCase)
  // .patch(validateMedCaseInput, validateIdParams, updateMedCase)
  // .delete(validateIdParams, deleteMedCase);

export default router;