import { Request, Response } from "express";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { tryAgainError } from "../../constant";
import { ValidatedRequest } from "../../models/genericModels";

export const deleteLecture = async (req: Request, res: Response<string>) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	const createdLectureRef = doc(db, `users/${userId}/createdLectures/${id}`);
	const lectureRef = doc(db, `lectures/${id}`);

	try {
		const publicLecture = await getDoc(lectureRef);

		if (publicLecture.exists()) {
			if (publicLecture.get("publish.authorId") !== userId)
				throw new Error("Not authorized");
			await deleteDoc(lectureRef);
		} else {
			await deleteDoc(createdLectureRef);
		}

		res.status(200).json("Successfully deleted");
	} catch (err) {
		console.error(err);
		res.status(400).json(tryAgainError);
	}
};
