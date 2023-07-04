import { Request, Response } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { CreatedLectureModel } from "../../models/creator.model";
import { ValidatedRequest } from "../../models/genericModels";

export const getCreatedLectureById = async (
	req: Request<any, any, CreatedLectureModel>,
	res: Response,
	next
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

		if (!docSnap.exists()) {
			res.status(404).json("Lecture not found");
		}

		res.status(200).json(docSnap.data());
	} catch (err) {
		next(err);
	}
};
