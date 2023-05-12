import { Router } from "express";
import { getLectures } from "../controllers/home-controller";
import { getLectureById } from "../controllers/lectures-controller";
import { default as tokenAuth } from "../middleware/tokenAuth-middleware";
const router = Router();

router.get("/lectures", tokenAuth, getLectures);
router.get("/lecture/:id", tokenAuth, getLectureById);

export default router;
