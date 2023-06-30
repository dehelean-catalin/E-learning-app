import { Router } from "express";
import { getLastChapter } from "../controllers/lectures-controller";
import {
	deleteLectureReview,
	getLectureCurrentProgress,
	getLectureProgress,
	postLectureProgress,
	putLectureLastDate,
	putLectureProgress,
} from "../controllers/watch-controller";
import { getLectureReviews } from "../controllers/watch-controller/_getLectureReviews.service";
import { postLectureReview } from "../controllers/watch-controller/_postLectureReview.service";
import { putLectureLastChapter } from "../controllers/watch-controller/_putLectureLastChapter.service";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { reviewSchema } from "../schema/lecture.schema";
const router = Router();

router.get("/lecture/:id/progress", tokenAuth, getLectureProgress);
router.get(
	"/lecture/:id/progress/:chapterId",
	tokenAuth,
	getLectureCurrentProgress
);
router.post("/lecture/:id/progress", tokenAuth, postLectureProgress);
router.put("/lecture/:id/progress", tokenAuth, putLectureProgress);
router.put("/lecture/:id/last-date", tokenAuth, putLectureLastDate);
router.get("/lectures/:id/last-chapter", tokenAuth, getLastChapter);
router.put("/lectures/:id/last-chapter", tokenAuth, putLectureLastChapter);

router.get("/lecture/:id/review", tokenAuth, getLectureReviews);
router.post("/lecture/:id/review", validation(reviewSchema), postLectureReview);

router.put("/lecture/:id/review", tokenAuth, deleteLectureReview);

export default router;
