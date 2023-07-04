import { Request, Response } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../config/firebase";
import { ValidatedRequest } from "../models/genericModels";
import { UserModel } from "../models/user-model";

export const getUserByID = async (req: Request, res: Response) => {
	try {
		const validatedReq = req as ValidatedRequest;
		const userRef = doc(db, "users", validatedReq.userData.userId);
		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) throw new Error("This user don't exist");

		const userData = userSnap.data() as UserModel;
		res.status(200).json(userData);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
