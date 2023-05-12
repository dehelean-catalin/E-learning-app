import { Router } from "express";
import { getSavedLectures } from "../controllers/lectures-controller";
import {
	deleteSavedLecture,
	getHistoryLectureList,
	getLastChapter,
	getUserByID,
	getWatchingLectureList,
	saveLecture,
	updatetWatchingLectureCurrenTime,
	updateWatchingLectureLastEntry,
} from "../controllers/user-controller";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import {
	WatchingLectureLastEntrySchema,
	WatchingLectureTimeSchema,
} from "../schema/users-schema";

const router = Router();

router.get("/user", tokenAuth, getUserByID);

router.get("/user/save-lecture", tokenAuth, getSavedLectures);
router.post("/user/save-lecture/:id", tokenAuth, saveLecture);
router.delete("/user/save-lecture/:id", tokenAuth, deleteSavedLecture);

router.get("/user/watching-lectures", tokenAuth, getWatchingLectureList);

router.put(
	"/user/watching-lectures/:id/time",
	validation(WatchingLectureTimeSchema),
	updatetWatchingLectureCurrenTime
);

router.put(
	"/user/watching-lectures/:id/last-entry",
	validation(WatchingLectureLastEntrySchema),
	updateWatchingLectureLastEntry
);

router.get("/user/history", tokenAuth, getHistoryLectureList);
router.get("/lectures/:id/last-chapter", tokenAuth, getLastChapter);

export default router;
