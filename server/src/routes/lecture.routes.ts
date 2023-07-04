import { Router } from "express";
import {
	addLectureReview,
	addSavedLectureId,
	deleteLectureReview,
	deleteSavedLectureId,
	getAllLectures,
	getAllSearchedLectures,
	getLectureById,
	getLectureReviews,
	getSavedLectures,
} from "../controllers/lectureController";
import { getLastChapter } from "../controllers/lectures-controller";
import {
	getLectureProgress,
	postLectureProgress,
	putLectureLastDate,
	putLectureProgress,
} from "../controllers/watch-controller";

import { putLectureLastChapter } from "../controllers/watch-controller/_putLectureLastChapter.service";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { progressSchema, reviewSchema } from "../schema/lecture.schema";

const router = Router();

router.get("/lectures", tokenAuth, getAllLectures);
router.get("/lecture/:id", tokenAuth, getLectureById);

router.get("/saved-lecture", tokenAuth, getSavedLectures);
router.post("/saved-lecture/:id", tokenAuth, addSavedLectureId);
router.delete("/saved-lecture/:id", tokenAuth, deleteSavedLectureId);

router.get("/search", tokenAuth, getAllSearchedLectures);

router.get("/lecture/:id/review", tokenAuth, getLectureReviews);
router.post("/lecture/:id/review", validation(reviewSchema), addLectureReview);
router.put("/lecture/:id/review", tokenAuth, deleteLectureReview);

// not verified
router.get("/lecture/:id/progress", tokenAuth, getLectureProgress);
router.post(
	"/lecture/:id/progress",
	validation(progressSchema),
	postLectureProgress
);
router.put("/lecture/:id/progress", tokenAuth, putLectureProgress);
router.put("/lecture/:id/last-date", tokenAuth, putLectureLastDate);
router.get("/lectures/:id/last-chapter", tokenAuth, getLastChapter);
router.put("/lectures/:id/last-chapter", tokenAuth, putLectureLastChapter);

export default router;
