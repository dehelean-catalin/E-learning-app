import { Router } from "express";
import validation from "../middleware/validation-middleware";
import {
	addUserSavedLecture,
	deleteUserSavedLecture,
} from "./../controllers/user-controller";
import { userSavedLectureModel } from "./../models/user-model";

const router = Router();

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
