import { Router } from 'express';
import { validateBasicInfoInput, validateMDParams } from '../middleware/validationMiddleware.js';
const router = Router();

import {
  getAllBasicInfos,
  createBasicInfo,
  getBasicInfo,
  updateBasicInfo,
  deleteBasicInfo
} from '../controllers/basicInfoController.js'

router.route('/').get(getAllBasicInfos).post(validateBasicInfoInput, createBasicInfo);
router
  .route('/:medical_history_no')
  .get(validateMDParams, getBasicInfo)
  .patch(updateBasicInfo)
  .delete(validateMDParams, deleteBasicInfo)

export default router;