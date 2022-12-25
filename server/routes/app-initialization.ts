import { Router } from "express";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import tokenAuthorization from "../middleware/tokenAuth-middleware";
const router = Router();

router.get(
	"/app-initialization",
	tokenAuthorization,
	async (req: any, res, next) => {
		try {
			const docRef = doc(db, "users", req.userData.userId);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				throw new Error("Try again! Something went wrong");
			}

			const { firstName, lastName, profilePicture, email } = docSnap.data();
			return res.status(200).json({
				lastName,
				firstName,
				email,
				profilePicture,
			});
		} catch {
			res.status(400).json("Try again! Something went wrong");
		}
	}
);

export default router;
