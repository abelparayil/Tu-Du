import { Router } from 'express';
import {
  userLogin,
  userRegister,
  userResetPassword,
} from '../controllers/user-controller.js';

const userRouter = Router();

userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);
userRouter.post('/reset-password', userResetPassword);

export default userRouter;
