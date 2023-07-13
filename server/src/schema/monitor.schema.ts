import Joi from "joi";
import { LectureProgress } from "../models/lectureModels";

export const createProgressSchema = Joi.object<LectureProgress, true>().keys({
	items: Joi.array().required(),
	lastName: Joi.string().required().messages({
		"any.required": "lastName is required",
		"string.empty": "lastName cannot be empty",
	}),
});

export const chapterNameSchema = Joi.object().keys({
	lastChapter: Joi.string().required().messages({
		"any.required": "Last chapter id is required",
		"string.empty": "Last chapter id cannot be empty",
	}),
	lastName: Joi.string().required().messages({
		"any.required": "lastName is required",
		"string.empty": "lastName cannot be empty",
	}),
});

export const updateProgressSchema = Joi.object().keys({
	chapterId: Joi.string().required().messages({
		"any.required": "chapterId is required",
		"string.empty": "chapterId cannot be empty",
	}),
	progress: Joi.custom((value) => {
		if (typeof value !== "number") throw new Error("Progress is not a number");
		return value;
	}),
});
