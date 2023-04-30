import { Request, Response } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { tryAgainError } from "../../constant";
import { CreatedLectureModel } from "../../models/creator.model";
import { ValidatedRequest } from "../../models/request";

export const getCreatedLecture = async (
	req: Request<any, any, CreatedLectureModel>,
	res: Response
) => {
	const validatedReq = req as ValidatedRequest;
	const createdLectureSRef = doc(
		db,
		`users/${validatedReq.userData.userId}/createdLectures/${req.params.id}`
	);
	const lectureRef = doc(db, `lectures/${req.params.id}`);

	try {
		let docSnap = await getDoc(createdLectureSRef);

		if (!docSnap.exists()) docSnap = await getDoc(lectureRef);

		res.status(200).json(docSnap.data());
	} catch {
		res.status(400).json(tryAgainError);
	}
};
