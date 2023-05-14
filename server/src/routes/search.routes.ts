import { Router } from "express";
import { getSearchLectures } from "../controllers/search-controller/_getSearchLectures";
import { default as tokenAuthMiddleware } from "../middleware/tokenAuth-middleware";

const router = Router();

router.get("/search", tokenAuthMiddleware, getSearchLectures);

export default router;
