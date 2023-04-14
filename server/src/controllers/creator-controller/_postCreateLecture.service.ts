import { Request, Response } from "express";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import db from "../../config/firebase";
import { tryAgainError } from "../../constant";
import {
	CreateLecturePayload,
	CreatedLectureModel,
} from "../../models/createdLecture.model";
import { ValidatedRequest } from "../../models/request";

const INITIAL_REQUIREMENTS = [
	{
		value: "",
		placeholder:
			"Ex:  Familiar with a text editor such as Visual Studio Code ...",
	},
	{
		value: "",
		placeholder: "Ex: Basic undersatings of HTML, CSS and Javascript ...",
	},
	{
		value: "",
		placeholder: "Ex: Advance knowledge of how React works under the hood ...",
	},
];

const INITIAL_GOALS = [
	{
		value: "",
		placeholder:
			"Ex: Demonstrate how to create a basic web page using HTML ...",
	},
	{
		value: "",
		placeholder: "Ex: Explain the fundamentals of HTML, CSS, and JavaScrip ...",
	},
	{
		value: "",
		placeholder:
			"Ex:  Benefits of using TypeScript for large-scale software projects ...",
	},
];

export const postCreateLecture = async (
	req: Request<any, any, CreateLecturePayload>,
	res: Response<string>
) => {
	try {
		const id = uuid();
		const validatedReq = req as ValidatedRequest;
		const lectureRef = doc(
			db,
			`users/${validatedReq.userData.userId}/createdLectures/${id}`
		);
		const lectureData: CreatedLectureModel = {
			id,
			lastUpdate: new Date().getTime(),
			publish: {
				...req.body,
				status: "Draft",
			},
			content: {},
			goals: INITIAL_GOALS,
			requirements: INITIAL_REQUIREMENTS,
		};

		await setDoc(lectureRef, lectureData);

		res.status(200).json("Successfully created");
	} catch (err) {
		console.error(err);
		res.status(400).json(tryAgainError);
	}
};
