import { getSavedLectures } from "./../controllers/lectures-controller";
import { Router } from "express";
import {
	deleteSavedLecture,
	getUserByID,
	getUserData,
	saveLecture,
	updateUserData,
	getWatchingLectureUrl,
	updatetWatchingLectureCurrenTime,
} from "../controllers/user-controller";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import {
	UserDataSchema,
	WatchingLectureTimeSchema,
} from "./../schema/users-schema";
import { getWatchingLectureByID } from "../controllers/watching-lectures-controller";

const router = Router();

router.get("/user", tokenAuth, getUserByID);
router.get("/user/data", tokenAuth, getUserData);
router.put("/user/data", validation(UserDataSchema), updateUserData);
router.get("/user/save-lecture", tokenAuth, getSavedLectures);
router.post("/user/save-lecture/:id", tokenAuth, saveLecture);
router.delete("/user/save-lecture/:id", tokenAuth, deleteSavedLecture);

router.get("/user/watching-lectures/:id", tokenAuth, getWatchingLectureByID);
router.get("/user/watching-lectures/:id/url", tokenAuth, getWatchingLectureUrl);

router.put(
	"/user/watching-lectures/:id/time",
	validation(WatchingLectureTimeSchema),
	updatetWatchingLectureCurrenTime
);
// router.post(
// 	"/watching-lectures",
// 	validation(WatchingLectureModel),
// 	addWatchingLectures
// );
// router.put("/watching-lectures", tokenAuth, updateWatchingLectures);
///aici ai ramas:
// router.post("/user", validation(UserSchema), addUserData);

export default router;
