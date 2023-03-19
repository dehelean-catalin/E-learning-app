import { Request, Response } from "express";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";
import { tryAgainError } from "./../../constant";

export const postCreateLecture = async (
	req: Request,
	res: Response<string>
) => {
	try {
		const id = uuid();
		const validatedReq = req as ValidatedRequest;
		const lectureRef = doc(
			db,
			`users/${validatedReq.userData.userId}/createdLectures/${id}`
		);

		await setDoc(lectureRef, {
			...req.body,
			id,
			lastUpdate: new Date(),
		});

		res.status(200).json("Successfully created");
	} catch (err) {
		console.error(err);
		res.status(400).json(tryAgainError);
	}
};
