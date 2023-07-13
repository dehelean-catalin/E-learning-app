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
import validation from "../middleware/validation-middleware";
import { reviewSchema } from "../schema/lecture.schema";

const router = Router();

router.get("/lectures", getAllLectures);
router.get("/lecture/:id", getLectureById);

router.get("/saved-lecture", getSavedLectures);
router.post("/saved-lecture/:id", addSavedLectureId);
router.delete("/saved-lecture/:id", deleteSavedLectureId);

router.get("/search", getAllSearchedLectures);

router.get("/lecture/:id/review", getLectureReviews);
router.post("/lecture/:id/review", validation(reviewSchema), addLectureReview);
router.put("/lecture/:id/review", deleteLectureReview);

export default router;
