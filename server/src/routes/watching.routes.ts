import { Router } from "express";
import {
	getWatchingLecture,
	postWatchingLecture,
} from "../controllers/watch-controller";
import tokenAuth from "../middleware/tokenAuth-middleware";

const router = Router();

router.get("/watching/:id", tokenAuth, getWatchingLecture);
router.post("/watching/:id", tokenAuth, postWatchingLecture);

export default router;
