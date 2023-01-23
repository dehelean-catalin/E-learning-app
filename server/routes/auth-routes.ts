import { Router } from "express";
import {
	changePassword,
	forgotPassword,
	login,
	register,
} from "../controllers/auth-controller";
import authentication from "../middleware/auth-middleware";
import tokenAuthMiddleware from "../middleware/tokenAuth-middleware";
import { loginSchema, registerSchema } from "../schema/auth-schema";

const router = Router();

router.post("/login", authentication(loginSchema), login);
router.post("/register", authentication(registerSchema), register);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", tokenAuthMiddleware, changePassword);
export default router;
