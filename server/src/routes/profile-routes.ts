import { Router } from "express";
import {
	getProfileBanner,
	getProfileData,
	getProfilePicture,
	putProfileBanner,
	putProfileData,
	putProfilePicture,
} from "../controllers/profile-controller";
import {
	default as tokenAuth,
	default as tokenAuthMiddleware,
} from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { ProfileSchema } from "../schema/users-schema";

const router = Router();

router.get("/profile-data", tokenAuthMiddleware, getProfileData);
router.put("/profile-data", validation(ProfileSchema), putProfileData);

router.get("/profile-picture", tokenAuth, getProfilePicture);
router.put("/profile-picture", tokenAuth, putProfilePicture);

router.get("/profile-banner", tokenAuth, getProfileBanner);
router.put("/profile-banner", tokenAuth, putProfileBanner);
export default router;
