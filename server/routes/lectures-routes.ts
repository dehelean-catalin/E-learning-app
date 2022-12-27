import {
	addLecture,
	getLectureById,
	getLectureChapterList,
	getLectureChapterUrl,
	getLectures,
	getSavedLectures,
} from "./../controllers/lectures-controller";
import { Router } from "express";
import validation from "../middleware/validation-middleware";
import tokenAuth from "../middleware/tokenAuth-middleware";
import { lectureSchema } from "../models/lecture-model";

const router = Router();
router.get("/lectures", tokenAuth, getLectures);
// router.get("/lecture/:id/overview", tokenAuth, getLectureChapterUrl);
// router.get("/lecture/:id/chapters", tokenAuth, getLectureChapterList);

// router.get("/lectures/:id", tokenAuth, getLectureById);
router.post("/lectures", validation(lectureSchema), addLecture);

router.get("/saved-lectures", tokenAuth, getSavedLectures);

export default router;
