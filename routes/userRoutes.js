import express from 'express';
import  {getAllUser, login, signup,authController}  from '../controllers/user-controller.js';
import authMiddleware from '../middleware/jwtMiddleware.js';
const UserRouter = express.Router();

UserRouter.get('/',getAllUser);
UserRouter.post('/signup',signup);
UserRouter.post('/login',login);
UserRouter.post('/protected',authMiddleware,authController);
export default UserRouter;