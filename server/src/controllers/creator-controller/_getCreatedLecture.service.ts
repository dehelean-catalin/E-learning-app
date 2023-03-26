import { Request, Response } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";
import { tryAgainError } from "./../../constant";

export const getCreatedLecture = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const lectureRef = doc(
		db,
		`users/${validatedReq.userData.userId}/createdLectures/${req.params.id}`
	);

	try {
		const docSnap = await getDoc(lectureRef);

		res.status(200).json(docSnap.data());
	} catch {
		res.status(400).json(tryAgainError);
	}
};
