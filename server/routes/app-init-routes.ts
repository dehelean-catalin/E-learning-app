import { NextFunction, Request, Response, Router } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import tokenAuth from "../middleware/tokenAuth-middleware";
import { ValidatedRequest } from "../models/request";
import { UserDataModel } from "../models/user-model";

const router = Router();

router.get(
	"/app-initialization",
	tokenAuth,
	async (req: Request, res: Response) => {
		try {
			const validatedReq = req as ValidatedRequest;
			const userRef = doc(db, "users", validatedReq.userData.userId);
			const userSnap = await getDoc(userRef);

			if (!userSnap.exists()) {
				throw new Error("This user don't exist anymore");
			}
			const { firstName, lastName, profilePicture, email } =
				userSnap.data() as UserDataModel;
			return res.status(200).json({
				lastName,
				firstName,
				email,
				profilePicture,
			});
		} catch {
			res
				.status(400)
				.json({ code: 400, message: "Try again! Something went wrong" });
		}
	}
);

export default router;
