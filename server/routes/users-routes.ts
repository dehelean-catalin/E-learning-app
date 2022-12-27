import { Router } from "express";
import {
	addUserData,
	getUserByID,
	getUserData,
	updateUserData,
} from "../controllers/user-controller";
import tokenAuth from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import { UserSchema } from "./../schema/users-schema";

const router = Router();

router.get("/user", tokenAuth, getUserByID);

router.get("/user/data", tokenAuth, getUserData);

router.post("/user", validation(UserSchema), addUserData);
router.put("/user-details", validation(UserSchema), updateUserData);

export default router;
