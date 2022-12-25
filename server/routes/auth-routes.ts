import { Router } from "express";
import authentication from "../middleware/authentication-middleware";
import { login, register } from "../controllers/auth-controller";
import { loginSchema, registerSchema } from "../models/authentication-model";

const router = Router();

router.post("/login", authentication(loginSchema), login);
router.post("/register", authentication(registerSchema), register);

export default router;
