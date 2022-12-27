import { Router } from "express";
import authentication from "../middleware/auth-middleware";
import { login, register } from "../controllers/auth-controller";
import { loginSchema, registerSchema } from "../schema/auth-schema";

const router = Router();

router.post("/login", authentication(loginSchema), login);
router.post("/register", authentication(registerSchema), register);

export default router;
