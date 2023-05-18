import { Request, Response } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";
import { UserDataModel } from "../../models/user-model";

export const getProfilePicture = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const userRef = doc(db, "users", validatedReq.userData.userId);
	try {
		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) throw new Error("This user don't exist");

		const profilePicture = userSnap.get("profilePicture") as UserDataModel;

		res.status(200).json(profilePicture);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
