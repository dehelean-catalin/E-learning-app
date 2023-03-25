import { Router } from "express";
import {
	getCreatedLecturesLength,
	getCreateLectures,
	postCreateLecture,
} from "../controllers/creator-controller";
import { default as tokenAuthMiddleware } from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { createLectureSchema } from "../schema/creator/create.schema";

const router = Router();

router.post("/create", validation(createLectureSchema), postCreateLecture);
router.get("/created-lectures", tokenAuthMiddleware, getCreateLectures);
router.get(
	"/created-lectures-length",
	tokenAuthMiddleware,
	getCreatedLecturesLength
);

export default router;
