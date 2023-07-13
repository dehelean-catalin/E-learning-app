import { Router } from "express";
import {
	createLectureTemplate,
	deleteLecture,
	getAllCreatedLectures,
	getCreatedLectureById,
	publishLecture,
	updateCreatedLecture,
	updateLecture,
	uploadLectureCaption,
	uploadLesson,
	uploadPromoVideo,
} from "../controllers/creatorController";
import { getSignedUrl } from "../middleware/getSignedUrl";
import validation from "../middleware/validation-middleware";
import {
	LectureSchema,
	PublicLectureSchema,
	lectureTemplateSchema,
} from "../schema/creator.schema";

const router = Router();

router.post(
	"/create",
	validation(lectureTemplateSchema),
	createLectureTemplate
);

router.get("/created-lectures", getAllCreatedLectures);
router.get("/created-lectures/:id", getCreatedLectureById);
router.post(
	"/created-lectures/:id",
	validation(LectureSchema),
	updateCreatedLecture
);

router.post("/caption/:id", uploadLectureCaption, getSignedUrl);
router.post("/promoVideo/:id", uploadPromoVideo, getSignedUrl);

router.post("/content/:id", uploadLesson);

router.post("/lecture/:id", validation(PublicLectureSchema), publishLecture);
router.put("/lecture/:id", validation(PublicLectureSchema), updateLecture);
router.delete("/lecture/:id", deleteLecture);

export default router;
