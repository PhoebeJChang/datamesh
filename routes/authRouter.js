import { Router } from "express";
import { 
  login, 
  logout, 
  register, 
  getAllUsers, 
  getUser, 
  updateUser, 
  deleteUser
} from "../controllers/authController.js";
import { validateRegisterInput, validateLoginInput, validateIdParams} from "../middleware/validationMiddleware.js";
const router = Router();


router.route('/').get(getAllUsers)

// add validate
router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);

router
  .route('/:id')
  .get(validateIdParams, getUser)
  .patch(updateUser)
  .delete(validateIdParams, deleteUser)

export default router;