import { Router } from "express";
import {
	deleteLecture,
	postContent,
	updateCaption,
	updateCreatedLecture,
	updatePromoVideo,
} from "../controllers/creator-controller";
import { postLecture } from "../controllers/creator-controller/_postPublishLecture.service";
import { putLecture } from "../controllers/creator-controller/_putLecture.service";
import {
	createLectureTemplate,
	getAllCreatedLectures,
	getCreatedLectureById,
} from "../controllers/creatorController";
import { default as tokenAuthMiddleware } from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { lectureTemplateSchema } from "../schema/creator.schema";
import {
	LectureSchema,
	PublicLectureSchema,
} from "../schema/creator/lecture.schema";

const router = Router();

router.post(
	"/create",
	validation(lectureTemplateSchema),
	createLectureTemplate
);

router.get("/created-lectures", tokenAuthMiddleware, getAllCreatedLectures);
router.get("/created-lectures/:id", tokenAuthMiddleware, getCreatedLectureById);

// aici ai ramas + creaza o lectura noua
router.post(
	"/created-lectures/:id",
	validation(LectureSchema),
	updateCreatedLecture
);

router.post("/caption/:id", tokenAuthMiddleware, updateCaption);
router.post("/promoVideo/:id", tokenAuthMiddleware, updatePromoVideo);

router.post("/content/:id", tokenAuthMiddleware, postContent);

router.post("/lecture/:id", validation(PublicLectureSchema), postLecture);
router.put("/lecture/:id", validation(PublicLectureSchema), putLecture);
router.delete("/lecture/:id", tokenAuthMiddleware, deleteLecture);

export default router;
