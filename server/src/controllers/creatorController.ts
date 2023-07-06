import { randomUUID } from "crypto";
import { RequestHandler } from "express";
import { firestoreDb, storageDb } from "../config/firebase-admin";
import {
	CreatedLectureModel,
	LectureTemplateData,
} from "../models/creatorModels";
import { FileRequest, ValidatedRequest } from "../models/genericModels";
import {
	createLectureTemplateData,
	deleteLectureData,
	getAllCreatedLecturesData,
	getCreatedLectureByIdData,
	publishLectureData,
	updateCreatedLectureData,
	uploadLessonData,
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
	const { id } = req.params;

	try {
		const data = await getCreatedLectureByIdData(id, userId);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const updateCreatedLecture: RequestHandler<
	{ id: string },
	any,
	CreatedLectureModel
> = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	try {
		const data = await updateCreatedLectureData(id, userId, req.body);

		res.status(200).json(data);
	} catch (err: any) {
		console.error(err);
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const uploadLectureCaption: RequestHandler<{ id: string }> = async (
	req,
	res,
	next
) => {
	const fileReq = req as FileRequest;
	const { buffer } = fileReq.file;
	const { id } = req.params;
	const captionId = randomUUID();

	try {
		const file = storageDb.file(`content/${id}/${captionId}`);
		await file.save(buffer, {
			resumable: false,
			contentType: "image/jpg",
		});

		res.locals.file = file;

		next();
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const uploadPromoVideo: RequestHandler<{ id: string }> = async (
	req,
	res,
	next
) => {
	const fileReq = req as FileRequest;
	const { buffer } = fileReq.file;
	const { id } = req.params;
	const videoId = randomUUID();

	try {
		const file = storageDb.file(`content/${id}/${videoId}`);
		await file.save(buffer, {
			resumable: true,
			contentType: "video/*",
		});

		res.locals.file = file;

		next();
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const uploadLesson: RequestHandler<{ id: string }> = async (
	req,
	res
) => {
	const fileReq = req as FileRequest;
	const { id } = req.params;

	try {
		if (!fileReq?.file) throw new Error("File not found");
		const { buffer, originalname } = fileReq.file;

		const data = await uploadLessonData(id, buffer, originalname);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const publishLecture: RequestHandler<{ id: string }> = async (
	req,
	res
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	try {
		const data = await publishLectureData(id, userId, req.body);

		res.status(201).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const updateLecture: RequestHandler<
	{ id: string },
	any,
	CreatedLectureModel
> = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { authorId } = req.body.publish;
	const { id } = req.params;

	try {
		if (authorId !== userId) throw new Error("Not authorized");

		const lectureRef = firestoreDb.collection("lectures").doc(id);

		await lectureRef.update({ ...req.body, lastUpdate: new Date().getTime() });

		res.status(200).json("Successfully updated");
	} catch (err: any) {
		console.error(err);
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const deleteLecture: RequestHandler<{ id: string }> = async (
	req,
	res
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	try {
		const data = await deleteLectureData(id, userId);

		res.status(200).json(data);
	} catch (err: any) {
		console.error(err);
		res.status(400).json({ code: 400, message: err.message });
	}
};
