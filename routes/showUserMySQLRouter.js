import { Router, query } from "express";
import {
  getAllUsers,
  updateUser,
  // getSingleUser,
  // deleteUser
} from "../controllers/showUserMySQLController.js";
import { validateIdParams } from "../middleware/validationMiddleware.js";
const router = Router();

//get all
router.route('/').get(getAllUsers)

router
  .route('/:id')
  .patch(updateUser)
//   .get(validateIdParams, getUser)
//   .delete(validateIdParams, deleteUser)

export default router;