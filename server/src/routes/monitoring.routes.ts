import { Router } from "express";
import {
	createLectureProgress,
	getLastChapterId,
	getLectureProgress,
	getMonitoringHistoryList,
	updateLastChapter,
	updateLectureProgress,
} from "../controllers/monitoringController";
import validation from "../middleware/validation-middleware";
import {
	chapterNameSchema,
	createProgressSchema,
	updateProgressSchema,
} from "../schema/monitor.schema";

const router = Router();

router.get("/history", getMonitoringHistoryList);

router.get("/lecture/:id/progress", getLectureProgress);

router.post(
	"/lecture/:id/progress",
	validation(createProgressSchema),
	createLectureProgress
);

router.put(
	"/lecture/:id/progress",
	validation(updateProgressSchema),
	updateLectureProgress
);

router.get("/lectures/:id/last-chapter", getLastChapterId);
router.put(
	"/lectures/:id/last-chapter",
	validation(chapterNameSchema),
	updateLastChapter
);

export default router;
