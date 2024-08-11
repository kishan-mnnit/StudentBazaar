import express from 'express';
import { loginUser,registerUser,getUserFromToken, getSellerData } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/seller/:id",getSellerData);



export default userRouter;