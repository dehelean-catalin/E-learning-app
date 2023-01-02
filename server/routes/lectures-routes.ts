import { Router } from "express";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { LectureSchema } from "../schema/lecture-schema";
import {
	addLecture,
	getLectureById,
	getLectures,
} from "./../controllers/lectures-controller";
const router = Router();
router.get("/lectures", tokenAuth, getLectures);

router.get("/lecture/:id", tokenAuth, getLectureById);
router.post("/lectures", validation(LectureSchema), addLecture);

export default router;
