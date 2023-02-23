import { Router } from "express";
import { signIn, signUp } from "../controllers/userController.js";
import { signInValidation } from "../middlewares/signInValidation.js";
import { signUpValidation } from "../middlewares/signUpValidation.js";

const userRouter = Router();

userRouter.post("/signin", signInValidation, signIn);
userRouter.post("/signup", signUpValidation, signUp);

export default userRouter;