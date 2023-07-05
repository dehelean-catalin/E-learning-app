import { Router } from "express";
import {
	createLectureProgress,
	getLastChapterId,
	getLectureProgress,
	getMonitoringHistoryList,
	updateLastChapter,
	updateLectureProgress,
} from "../controllers/monitoringController";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { chapterNameSchema, progressSchema } from "../schema/lecture.schema";

const router = Router();

router.get("/history", tokenAuth, getMonitoringHistoryList);

router.get("/lecture/:id/progress", tokenAuth, getLectureProgress);
router.post(
	"/lecture/:id/progress",
	validation(progressSchema),
	createLectureProgress
);
router.put("/lecture/:id/progress", tokenAuth, updateLectureProgress);

router.get("/lectures/:id/last-chapter", tokenAuth, getLastChapterId);
router.put(
	"/lectures/:id/last-chapter",
	validation(chapterNameSchema),
	updateLastChapter
);

export default router;
