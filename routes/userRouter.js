import { Router } from 'express';
import { validateUserName } from '../middleware/validationMiddleware.js';
const router = Router();

import {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js'

router.route('/').get(getAllUser).post(createUser);
router
  .route('/:name')
  .get(validateUserName, getUser)
  .patch( validateUserName, updateUser)
  .delete(validateUserName, deleteUser);

export default router;