import { UnauthenticatedError } from "../errors/customErrors.js"; 
import { verifyJWT } from '../utils/tokenUtils.js';

// check the user's cookies and JWT are exist or not
export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('authentication invalid1');
  }

  try {
    const { userId } = verifyJWT(token);
    req.user = { userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid2');
  }
};