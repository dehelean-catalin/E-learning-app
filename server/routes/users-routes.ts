import {
	addUserSavedLecture,
	addWatchingLectures,
	deleteUserSavedLecture,
	getWatchingLectures,
	updateWatchingLectures,
} from "./../controllers/user-controller";
import {
	userSavedLectureModel,
	userModel,
	userDetailsModel,
	wachingLecturesModel,
} from "./../models/user-model";
import { addUserData } from "../controllers/user-controller";
import { getUserData, updateUserData } from "../controllers/user-controller";
import { Router } from "express";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";

const router = Router();

enum Route {
	UserDetails = "/user-details",
	WatchingLectures = "/watching-lectures",
}

// router.get("/user/lectures", tokenAuth, getAllUserSavedLectures);
router.put(
	"/add-lectures",
	validation(userSavedLectureModel),
	addUserSavedLecture
);
router.put(
	"/delete-lecture",
	validation(userSavedLectureModel),
	deleteUserSavedLecture
);

router.post("/user", validation(userModel), addUserData);

router.get("/user-details", tokenAuth, getUserData);
router.put("/user-details", validation(userDetailsModel), updateUserData);

// !!! WATCHING LECTURES ROUTES:

router.get(Route.WatchingLectures, tokenAuth, getWatchingLectures);
router.post(
	Route.WatchingLectures,
	validation(wachingLecturesModel),
	addWatchingLectures
);

router.put(Route.WatchingLectures, tokenAuth, updateWatchingLectures);

export default router;
