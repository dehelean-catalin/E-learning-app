import { getSavedLectures } from "./../controllers/lectures-controller";
import { Router } from "express";
import {
	deleteSavedLecture,
	getUserByID,
	getUserData,
	saveLecture,
	updateUserData,
	updatetWatchingLectureCurrenTime,
} from "../controllers/user-controller";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import {
	UserDataSchema,
	WatchingLectureTimeSchema,
} from "./../schema/users-schema";
import {
	addWatchingLecture,
	getWatchingLectureByID,
	getWatchingLectureList,
} from "../controllers/watching-lectures-controller";

const router = Router();

router.get("/user", tokenAuth, getUserByID);
router.get("/user/data", tokenAuth, getUserData);
router.put("/user/data", validation(UserDataSchema), updateUserData);

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

// router.put("/watching-lectures", tokenAuth, updateWatchingLectures);
///aici ai ramas:
// router.post("/user", validation(UserSchema), addUserData);

export default router;
