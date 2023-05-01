import { Router } from "express";
import { getLectures } from "../controllers/home-controller";
import { addLecture, getLectureById } from "../controllers/lectures-controller";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { LectureSchema } from "../schema/lecture-schema";
const router = Router();

router.get("/lectures", tokenAuth, getLectures);
router.get("/lecture/:id", tokenAuth, getLectureById);
router.post("/lectures", validation(LectureSchema), addLecture);

export default router;
