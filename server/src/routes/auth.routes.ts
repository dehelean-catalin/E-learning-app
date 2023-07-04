import { Router } from "express";
import {
	changePassword,
	deleteUser,
	forgotPassword,
	getConnectionsList,
	login,
	loginWithProvider,
	register,
} from "../controllers/auth-controller";
import authentication from "../middleware/auth-middleware";
import tokenAuthMiddleware from "../middleware/tokenAuth-middleware";
import { loginSchema, registerSchema } from "../schema/auth-schema";

const router = Router();

router.post("/login", authentication(loginSchema), login);
router.post("/register", authentication(registerSchema), register);
router.post(
	"/login-provider",
	authentication(registerSchema),
	loginWithProvider
);

router.post("/forgot-password", forgotPassword);
router.post("/change-password", tokenAuthMiddleware, changePassword);
router.get("/connections-list", tokenAuthMiddleware, getConnectionsList);
router.delete("/delete-user", tokenAuthMiddleware, deleteUser);

export default router;
