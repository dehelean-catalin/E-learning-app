import { Router } from "express";
import { getSavedLectures } from "../controllers/lectures-controller";

import {
	deleteSavedLecture,
	postSavedLecture,
} from "../controllers/savedLectures.controller";
import tokenAuth from "../middleware/tokenAuth-middleware";

const router = Router();

router.get("/saved-lecture", tokenAuth, getSavedLectures);
router.post("/saved-lecture/:id", tokenAuth, postSavedLecture);
router.delete("/saved-lecture/:id", tokenAuth, deleteSavedLecture);

export default router;
