import { Router } from "express";
import {
	changePassword,
	forgotPassword,
	getConnectionsList,
	login,
	loginWithGoogle,
	register,
} from "../controllers/auth-controller";
import authentication from "../middleware/auth-middleware";
import tokenAuthMiddleware from "../middleware/tokenAuth-middleware";
import { loginSchema, registerSchema } from "../schema/auth-schema";

const router = Router();

router.post("/login", authentication(loginSchema), login);
router.post("/login-with-google", loginWithGoogle);
router.post("/register", authentication(registerSchema), register);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", tokenAuthMiddleware, changePassword);
router.get("/connections-list", tokenAuthMiddleware, getConnectionsList);
export default router;
