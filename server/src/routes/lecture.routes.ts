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

import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { reviewSchema } from "../schema/lecture.schema";

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

export default router;
