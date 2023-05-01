import { Router } from "express";
import {
	deleteLecture,
	getCreatedLectures,
	postContent,
	postCreateLecture,
	updateCaption,
	updateCreatedLecture,
	updatePromoVideo,
} from "../controllers/creator-controller";
import { getCreatedLectureById } from "../controllers/creator-controller/_getCreatedLectureById.service";
import { postPublishLecture } from "../controllers/creator-controller/_postPublishLecture.service";
import { putLecture } from "../controllers/creator-controller/_putLecture.service";
import { default as tokenAuthMiddleware } from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { createLectureSchema } from "../schema/creator/create.schema";
import {
	LectureSchema,
	PublicLectureSchema,
} from "../schema/creator/lecture.schema";

const router = Router();

router.get("/created-lectures", tokenAuthMiddleware, getCreatedLectures);
router.get("/created-lectures/:id", tokenAuthMiddleware, getCreatedLectureById);

router.post("/create", validation(createLectureSchema), postCreateLecture);
router.post(
	"/created-lectures/:id",
	validation(LectureSchema),
	updateCreatedLecture
);

router.post("/caption/:id", tokenAuthMiddleware, updateCaption);
router.post("/promoVideo/:id", tokenAuthMiddleware, updatePromoVideo);

router.post("/content/:id", tokenAuthMiddleware, postContent);
router.post(
	"/publish/:id",
	validation(PublicLectureSchema),
	postPublishLecture
);

router.put("/lecture/:id", validation(PublicLectureSchema), putLecture);
router.delete("/lecture/:id", tokenAuthMiddleware, deleteLecture);

export default router;
