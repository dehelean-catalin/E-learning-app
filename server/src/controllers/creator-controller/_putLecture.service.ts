import { Request, Response } from "express";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { tryAgainError } from "../../constant";
import { CreatedLectureModel } from "../../models/creator.model";
import { ValidatedRequest } from "../../models/request";

export const putLecture = async (
	req: Request<any, any, CreatedLectureModel>,
	res: Response<string>
) => {
	const validatedReq = req as ValidatedRequest;
	const { authorId } = req.body.publish;
	const { userId } = validatedReq.userData;

	const lectureRef = doc(db, `lectures/${req.params.id}`);

	try {
		if (authorId !== userId) throw new Error("Not authorized");

		await updateDoc(lectureRef, {
			...req.body,
			lastUpdate: new Date().getTime(),
		});

		res.status(200).json("Successfully updated");
	} catch (err) {
		console.error(err);
		res.status(400).json(tryAgainError);
	}
};
