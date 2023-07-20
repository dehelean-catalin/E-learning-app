import { Router } from "express";
import {
	createAccount,
	deleteAccount,
	getAccount,
	getConnectionList,
	getUserById,
	loginWithProvider,
	updateAccount,
	updateConnectionList,
	uploadProfilePicture,
} from "../controllers/userController";
import { getSignedUrl } from "../middleware/getSignedUrl";
import validation from "../middleware/validation-middleware";
import {
	AccountSchema,
	connectionSchema,
	createAccountSchema,
	providerSchema,
} from "../schema/user.schema";

const router = Router();
router.get("/user/:id", getUserById);
router.get("/account", getAccount);
router.post("/account", validation(createAccountSchema), createAccount);
router.put("/account", validation(AccountSchema), updateAccount);
router.delete("/account", deleteAccount);

router.put("/profile-picture", uploadProfilePicture, getSignedUrl);

router.get("/connections", getConnectionList);
router.post("/connections", validation(connectionSchema), updateConnectionList);

router.post("/login-provider", validation(providerSchema), loginWithProvider);

export default router;
