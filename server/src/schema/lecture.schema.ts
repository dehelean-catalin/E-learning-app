import Joi from "joi";
import { ReviewData } from "../models/creator.model";
import { LectureProgress } from "../models/lectureModels";

export const reviewSchema = Joi.object<ReviewData, true>().keys({
	author: Joi.string().required().messages({
		"any.required": "author is required",
		"string.empty": "author cannot be empty",
	}),
	profilePicture: Joi.string().allow("").required(),
	message: Joi.string().allow("").required(),
	rating: Joi.custom((value) => {
		if (typeof value !== "number") throw new Error("Rating is not a number");
		if (value < 1 || value > 5)
			throw new Error("Rating exceeds the allowed limits");
		return value;
	})
		.required()
		.messages({
			"any.required": "rating is required",
		}),
});

export const progressSchema = Joi.object<LectureProgress, true>().keys({
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
