import { Request, Response } from "express";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";

export const postPublishLecture = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const lectureRef = doc(
		db,
		`users/${validatedReq.userData.userId}/createdLectures/${req.params.id}`
	);

	try {
		await setDoc(doc(db, "lectures", req.params.id), {
			...req.body,
			publish: { ...req.body.publish, status: "Public" },
		});

		await deleteDoc(lectureRef);

		res.status(200).json("Success");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
