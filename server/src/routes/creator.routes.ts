import { Router } from "express";
import {
	getCreatedLectures,
	getCreatedLecturesLength,
	postContent,
	postCreateLecture,
	updateCaption,
	updateCreatedLecture,
	updatePromoVideo,
} from "../controllers/creator-controller";
import { getCreatedLecture } from "../controllers/creator-controller/_getCreatedLecture.service";
import { postPublishLecture } from "../controllers/creator-controller/_postPublishLecture.service";
import { default as tokenAuthMiddleware } from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { createLectureSchema } from "../schema/creator/create.schema";
import { LectureSchema } from "../schema/creator/lecture.schema";

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
	"/created-lectures/:id",
	validation(LectureSchema),
	updateCreatedLecture
);

router.post("/caption/:id", tokenAuthMiddleware, updateCaption);
router.post("/promoVideo/:id", tokenAuthMiddleware, updatePromoVideo);

router.post("/content/:id", tokenAuthMiddleware, postContent);
router.post("/publish/:id", tokenAuthMiddleware, postPublishLecture);

export default router;
