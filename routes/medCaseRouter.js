import { Router } from 'express';
import { validateMedCaseInput, validateIdParams } from '../middleware/validationMiddleware.js';
const router = Router();

import {
  getAllMedCases,
  createMedCase,
  getMedCase,
  updateMedCase,
  deleteMedCase
} from '../controllers/medCaseController.js'

router.route('/').get(getAllMedCases).post(validateMedCaseInput, createMedCase);
router
  .route('/:id_number')
  .get(validateIdParams, getMedCase)
  .patch(validateMedCaseInput, validateIdParams, updateMedCase)
  .delete(validateIdParams, deleteMedCase);

export default router;