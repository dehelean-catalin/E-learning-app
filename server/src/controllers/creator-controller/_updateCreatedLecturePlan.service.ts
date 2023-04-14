import { Request, Response } from "express";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { tryAgainError } from "../../constant";
import { ValidatedRequest } from "../../models/request";

export const updateCreatedLecture = async (
	req: Request<any, any, any>,
	res: Response<string>
) => {
	const validatedReq = req as ValidatedRequest;
	const lectureRef = doc(
		db,
		`users/${validatedReq.userData.userId}/createdLectures/${req.params.id}`
	);
	try {
		await updateDoc(lectureRef, req.body);

		res.status(200).json("Successfully created");
	} catch (err) {
		console.error(err);
		res.status(400).json(tryAgainError);
	}
};
