import { Router } from "express";
import {
	getCreatedLectures,
	getCreatedLecturesLength,
	postCreateLecture,
	updateCreatedLecturePlan,
} from "../controllers/creator-controller";
import { getCreatedLecture } from "../controllers/creator-controller/_getCreatedLecture.service";
import { default as tokenAuthMiddleware } from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { createLectureSchema } from "../schema/creator/create.schema";

const router = Router();

router.get("/created-lectures", tokenAuthMiddleware, getCreatedLectures);
router.get("/created-lectures/:id", tokenAuthMiddleware, getCreatedLecture);
router.get(
	"/created-lectures-length",
	tokenAuthMiddleware,
	getCreatedLecturesLength
);
router.post("/create", validation(createLectureSchema), postCreateLecture);
router.post(
	"/created-lectures/:id/plan",
	tokenAuthMiddleware,
	updateCreatedLecturePlan
);
export default router;
