import { Router } from 'express';
import { validateIdParams } from '../middleware/validationMiddleware.js';
const router = Router();

import {
  // getAllMedCases,
  // createMedCase,
  getMedCase,
  // updateMedCase,
  // deleteMedCase
} from '../controllers/medCaseController.js'

// router.route('/').get(getAllMedCases).post(validateMedCaseInput, createMedCase);
router
  .route('/:medical_history_no')
  .get(validateIdParams, getMedCase)
  // .patch(validateMedCaseInput, validateIdParams, updateMedCase)
  // .delete(validateIdParams, deleteMedCase);

export default router;