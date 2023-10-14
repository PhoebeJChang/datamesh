import { Router } from 'express';
const router = Router();

import{
  getAllMedCases,
  createMedCase,
  getMedCase,
  updateMedCase,
  deleteMedCase
} from '../controllers/medCaseController.js'

router.route('/').get(getAllMedCases).post(createMedCase);
router.route('/:id_number').get(getMedCase).patch(updateMedCase).delete(deleteMedCase);

export default router;