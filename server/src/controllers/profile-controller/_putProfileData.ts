import { Request, Response } from "express";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";

export const putProfileData = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const docRef = doc(db, "users", validatedReq.userData.userId);

	try {
		await updateDoc(docRef, req.body);
		res.status(200).json("Succesfully saved");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
