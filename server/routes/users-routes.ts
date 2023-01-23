import { Router } from "express";
import {
	addWatchingLecture,
	deleteSavedLecture,
	getProfilePicture,
	getUserByID,
	getUserData,
	getWatchingLectureByID,
	getWatchingLectureList,
	saveLecture,
	updatetWatchingLectureCurrenTime,
	updateUserData,
	updateUserProfilePicture,
	updateWatchingLectureLastEntry,
} from "../controllers/user-controller";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { getSavedLectures } from "./../controllers/lectures-controller";
import {
	getCurrentPage,
	getHistoryLectureList,
} from "./../controllers/user-controller";
import {
	UserDataSchema,
	WatchingLectureLastEntrySchema,
	WatchingLectureTimeSchema,
} from "./../schema/users-schema";

const router = Router();
router.get("/user", tokenAuth, getUserByID);
router.get("/user/data", tokenAuth, getUserData);
router.put("/user/data", validation(UserDataSchema), updateUserData);

router.get("/user/profile-picture", tokenAuth, getProfilePicture);
router.post("/user/profile-picture", tokenAuth, updateUserProfilePicture);

router.get("/user/save-lecture", tokenAuth, getSavedLectures);
router.post("/user/save-lecture/:id", tokenAuth, saveLecture);
router.delete("/user/save-lecture/:id", tokenAuth, deleteSavedLecture);

router.get("/user/watching-lectures", tokenAuth, getWatchingLectureList);
router.get("/user/watching-lectures/:id", tokenAuth, getWatchingLectureByID);
router.post("/user/watching-lectures/:id", tokenAuth, addWatchingLecture);
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
router.get("/user/watching-lectures/:id/page", tokenAuth, getCurrentPage);

export default router;
