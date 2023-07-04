import { Router } from "express";
import {
	createLectureProgress,
	getLastChapter,
	getLectureProgress,
	getMonitoringHistoryList,
	putLectureLastChapter,
	putLectureLastDate,
	updateLectureProgress,
} from "../controllers/monitoringController";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { progressSchema } from "../schema/lecture.schema";

const router = Router();

router.get("/history", tokenAuth, getMonitoringHistoryList);

router.get("/lecture/:id/progress", tokenAuth, getLectureProgress);
router.post(
	"/lecture/:id/progress",
	validation(progressSchema),
	createLectureProgress
);
router.put("/lecture/:id/progress", tokenAuth, updateLectureProgress);

// update this
router.put("/lecture/:id/last-date", tokenAuth, putLectureLastDate);
router.get("/lectures/:id/last-chapter", tokenAuth, getLastChapter);
router.put("/lectures/:id/last-chapter", tokenAuth, putLectureLastChapter);

export default router;
