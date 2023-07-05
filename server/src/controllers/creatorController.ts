import { RequestHandler } from "express";
import {
	CreatedLectureModel,
	LectureTemplateData,
} from "../models/creator.model";
import { ValidatedRequest } from "../models/genericModels";
import {
	createLectureTemplateData,
	getAllCreatedLecturesData,
	getCreatedLectureByIdData,
} from "../services/creatorService";

export const createLectureTemplate: RequestHandler<
	any,
	any,
	LectureTemplateData
> = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const data = await createLectureTemplateData(userId, req.body);

		res.status(201).json(data);
	} catch (err: any) {
		console.error(err);
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getAllCreatedLectures: RequestHandler = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const data = await getAllCreatedLecturesData(userId);

		res.status(200).json(data);
	} catch (err: any) {
		console.error(err);
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getCreatedLectureById: RequestHandler<
	any,
	any,
	CreatedLectureModel
> = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const id = req.params.id;
		if (!id) throw new Error("Lecture not found");

		const data = await getCreatedLectureByIdData(id, userId);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
