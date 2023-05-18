import { Router } from "express";
import {
	getLastChapter,
	getUserByID,
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

router.get("/lectures/:id/last-chapter", tokenAuth, getLastChapter);

export default router;
