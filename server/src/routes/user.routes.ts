import { Router } from "express";
import {
	createAccount,
	deleteAccount,
	getAccount,
	getConnectionList,
	loginWithProvider,
	updateAccount,
	updateConnectionList,
	uploadProfilePicture,
} from "../controllers/userController";
import { getSignedUrl } from "../middleware/getSignedUrl";
import { default as tokenAuth } from "../middleware/tokenAuth-middleware";
import validation from "../middleware/validation-middleware";
import {
	AccountSchema,
	connectionSchema,
	createAccountSchema,
	providerAccountSchema,
} from "../schema/user.schema";

const router = Router();

router.get("/account", tokenAuth, getAccount);
router.post("/account", validation(createAccountSchema), createAccount);
router.put("/account", validation(AccountSchema), updateAccount);
router.delete("/account", tokenAuth, deleteAccount);

router.put("/profile-picture", tokenAuth, uploadProfilePicture, getSignedUrl);

router.get("/connections", tokenAuth, getConnectionList);
router.post("/connections", validation(connectionSchema), updateConnectionList);

router.post(
	"/login-provider",
	validation(providerAccountSchema),
	loginWithProvider
);

export default router;
