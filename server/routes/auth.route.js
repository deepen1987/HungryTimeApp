import { Router } from "express";
import authController from "../controller/auth.controller.js";
import catchAsync from "../middleware/catchAsync.js";
import authenticate from '../middleware/authenticate.js';

const { signup, login, protectedRoute, deleteAccount, resetPassword } = authController;

const authRouter = Router();

authRouter.post('/signup', catchAsync(signup));
authRouter.post('/login', catchAsync(login));
// authRouter.get('/amiworthy', authenticate, catchAsync(protectedRoute));
// authRouter.delete('/deleteAccount', catchAsync(deleteAccount));
authRouter.put('/resetPassword', catchAsync(resetPassword));

export default authRouter;