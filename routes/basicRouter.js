import { Router } from 'express';
import { validateBasic } from '../middleware/validationMiddleware.js';
const router = Router();

import {
  getAllBasic,
  createBasic,
  getBasic,
  updateBasic,
  deleteBasic
} from '../controllers/basicinfController.js'

router.route('/').get(getAllBasic).post(createBasic);
router
  .route('/:chart_no')
  .get(validateBasic, getBasic)
  .patch( validateBasic, updateBasic)
  .delete(validateBasic, deleteBasic);

export default router;
validateBasic