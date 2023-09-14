import express from "express";
import authController from "../controllers/auth/authController.js";
const authRouter = express.Router();

authRouter.post("/", authController.verifyToken);
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
export default authRouter;
