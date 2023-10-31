import { Router } from 'express';
import { validateHistory } from '../middleware/validationMiddleware.js';
const router = Router();

import {
  getAllHistory,
  createHistory,
  getHistory,
  updateHistory,
  deleteHistory
} from '../controllers/historyController.js'

router.route('/').get(getAllHistory).post(createHistory);
router
  .route('/:chart_no')
  .get(validateHistory, getHistory)
  .patch( validateHistory, updateHistory)
  .delete(validateHistory, deleteHistory);

export default router;