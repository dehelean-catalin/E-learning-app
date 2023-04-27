import { Request, Response } from "express";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import db from "../../config/firebase";
import { CreatedLectureModel } from "../../models/creator.model";
import { ValidatedRequest } from "../../models/request";

export const postPublishLecture = async (req: Request, res: Response) => {
	const id = uuid();
	const validatedReq = req as ValidatedRequest;
	const lectureRef = doc(
		db,
		`users/${validatedReq.userData.userId}/createdLectures/${req.params.id}`
	);

	const data = {
		id,
		...req.body,
		publish: { ...req.body.publish, status: "Public" },
	} as CreatedLectureModel;

	try {
		await setDoc(doc(db, "lectures", id), data);
		await updateDoc(lectureRef, { "publish.status": "Public" });

		res.status(200).json("Success");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
