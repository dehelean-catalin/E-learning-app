import { Router } from "express";
import { getHistoryLectureList } from "../controllers/user-controller";
import tokenAuth from "../middleware/tokenAuth-middleware";

const router = Router();

router.get("/history", tokenAuth, getHistoryLectureList);

export default router;
