import { Request, Response } from "express";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import db from "../../config/firebase";
import { tryAgainError } from "../../constant";
import { CreatedLecturesModel } from "../../models/creator/createdLectures.model";
import { CreateLecture } from "../../models/creator/createLecture.model";
import { ValidatedRequest } from "../../models/request";

export const postCreateLecture = async (
	req: Request<any, any, CreateLecture>,
	res: Response<string>
) => {
	try {
		const id = uuid();
		const validatedReq = req as ValidatedRequest;
		const lectureRef = doc(
			db,
			`users/${validatedReq.userData.userId}/createdLectures/${id}`
		);
		const lectureData: CreatedLecturesModel = {
			...req.body,
			id,
			lastUpdate: new Date().getTime(),
			status: "Draft",
			plan: {
				goals: [],
				requirements: [],
			},
		};

		await setDoc(lectureRef, lectureData);

		res.status(200).json("Successfully created");
	} catch (err) {
		console.error(err);
		res.status(400).json(tryAgainError);
	}
};
