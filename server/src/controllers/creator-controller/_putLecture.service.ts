import { Request, Response } from "express";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { tryAgainError } from "../../constant";
import { Content, CreatedLectureModel } from "../../models/creator.model";
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
			duration: lectureDurationBasedOnContent(req.body.content),
			lastUpdate: new Date().getTime(),
		});

		res.status(200).json("Successfully updated");
	} catch (err) {
		console.error(err);
		res.status(400).json(tryAgainError);
	}
};

const lectureDurationBasedOnContent = (data: Content[]) => {
	let seconds = 0;

	for (const i in data) {
		for (const j in data[i].children) {
			seconds += data[i].children[j].data.duration;
		}
	}

	return seconds;
};
