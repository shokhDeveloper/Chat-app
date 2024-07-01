import { authController } from "#controller/authController.js";
import express from "express";
export const authRouter = express.Router();

authRouter.route("/register").post(authController.REGISTER);
authRouter.route("/login").post(authController.LOGIN);