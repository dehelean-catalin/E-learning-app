import { Request, Response } from "express";
import { collection, getCountFromServer } from "firebase/firestore";
import db from "../../config/firebase";
import { tryAgainError } from "../../constant";
import { ValidatedRequest } from "../../models/request";

export const getCreatedLecturesLength = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const lectureRef = collection(
		db,
		`users/${validatedReq.userData.userId}/createdLectures`
	);
	try {
		const snapshot = await getCountFromServer(lectureRef);
		console.log("count: ", snapshot.data().count);

		res.status(200).json(snapshot.data().count);
	} catch {
		res.status(400).json(tryAgainError);
	}
};
