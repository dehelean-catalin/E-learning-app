import { RequestHandler } from "express";
import { Category, ReviewData } from "../models/creatorModels";
import { ValidatedRequest } from "../models/genericModels";
import { QueryFilterParams } from "../models/lectureModels";
import {
	addLectureReviewData,
	addSavedLectureIdData,
	deleteLectureReviewData,
	deleteSavedLectureIdData,
	getAllLecturesData,
	getAllSearchedLecturesData,
	getLectureByIdData,
	getLectureReviewsData,
	getSavedLecturesData,
} from "../services/lectureService";

export const getAllLectures: RequestHandler = async (req, res) => {
	const validatedRequest = req as ValidatedRequest;
	const { userId } = validatedRequest.userData;

	try {
		if (!req.query?.category) throw new Error("Empty category");

		const category = req.query.category as Category;

		if (!Object.values(Category).includes(category))
			throw new Error("Invalid category");

		const data = await getAllLecturesData(userId, category);

		res.status(200).json(data);
	} catch (err: any) {
		console.log(err);
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getLectureById: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const validatedRequest = req as ValidatedRequest;
	const { userId } = validatedRequest.userData;

	try {
		const data = await getLectureByIdData(id, userId);
		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getSavedLectures: RequestHandler = async (req, res) => {
	const validatedRequest = req as ValidatedRequest;
	const { userId } = validatedRequest.userData;

	try {
		const data = await getSavedLecturesData(userId);
		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const addSavedLectureId: RequestHandler = async (req, res) => {
	const validatedRequest = req as ValidatedRequest;
	const { userId } = validatedRequest.userData;
	const { id } = req.params;
	try {
		const data = await addSavedLectureIdData(userId, id);
		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const deleteSavedLectureId: RequestHandler = async (req, res) => {
	const validatedRequest = req as ValidatedRequest;
	const { userId } = validatedRequest.userData;
	const { id } = req.params;
	try {
		const data = await deleteSavedLectureIdData(userId, id);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getAllSearchedLectures: RequestHandler<
	any,
	any,
	any,
	QueryFilterParams
> = async (req, res) => {
	try {
		if (!req.query?.searchQuery) throw new Error("Search query can't be empty");

		const data = await getAllSearchedLecturesData(req.query);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getLectureReviews: RequestHandler = async (req, res) => {
	const { id } = req.params;
	try {
		const data = await getLectureReviewsData(id);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const addLectureReview: RequestHandler<any, any, ReviewData> = async (
	req,
	res
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	try {
		const data = await addLectureReviewData(id, userId, req.body);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const deleteLectureReview: RequestHandler = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	try {
		const rating = req.body?.rating;

		if (!rating) throw new Error("Rating not found");

		const data = await deleteLectureReviewData(id, userId, rating);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
