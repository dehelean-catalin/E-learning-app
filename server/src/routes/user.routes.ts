import { Router } from "express";
import { getUserByID } from "../controllers/user-controller";
import tokenAuth from "../middleware/tokenAuth-middleware";

const router = Router();

router.get("/user", tokenAuth, getUserByID);

export default router;
