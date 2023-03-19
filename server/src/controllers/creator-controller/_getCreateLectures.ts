import { Request, Response } from "express";
import { collection, getDocs } from "firebase/firestore";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";
import { tryAgainError } from "./../../constant";

export const getCreateLectures = async (
	req: Request,
	res: Response<string>
) => {
	let createdLectures: any = [];
	try {
		const validatedReq = req as ValidatedRequest;

		const lectureRef = collection(
			db,
			`users/${validatedReq.userData.userId}/createdLectures`
		);

		const snapshot = await getDocs(lectureRef);

		snapshot.forEach((doc) => {
			if (doc.exists()) createdLectures.push(doc.data());
		});

		res.status(200).json(createdLectures);
	} catch (err) {
		console.error(err);
		res.status(400).json(tryAgainError);
	}
};
