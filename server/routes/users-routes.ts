import { Router } from "express";
import {
	addUserData,
	getUserData,
	updateUserData,
} from "../controllers/user-controller";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import {
	addUserSavedLecture,
	deleteUserSavedLecture,
} from "./../controllers/user-controller";
import {
	userDetailsModel,
	userModel,
	userSavedLectureModel,
} from "./../models/user-model";

const router = Router();

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

export default router;
