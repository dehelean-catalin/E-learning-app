import { Router } from "express";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import {
	addWatchingLectures,
	getWatchingLectureByID,
	updateWatchingLectures,
} from "./../controllers//watching-lectures-controller";
import { WatchingLectureModel } from "./../models/watching-lectures-model";

const router = Router();

router.get("/watching-lectures", tokenAuth, getWatchingLectureByID);
router.post(
	"/watching-lectures",
	validation(WatchingLectureModel),
	addWatchingLectures
);
router.put("/watching-lectures", tokenAuth, updateWatchingLectures);

export default router;
