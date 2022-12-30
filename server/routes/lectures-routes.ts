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
import { LectureSchema } from "../schema/lecture-schema";
const router = Router();
router.get("/lectures", tokenAuth, getLectures);

router.get("/lecture/:id", tokenAuth, getLectureById);
// router.get("/lecture/:id/overview", tokenAuth, getLectureChapterUrl);
// router.get("/lecture/:id/chapters", tokenAuth, getLectureChapterList);

router.post("/lectures", validation(LectureSchema), addLecture);

// router.get("/saved-lectures", tokenAuth, getSavedLectures);

export default router;
