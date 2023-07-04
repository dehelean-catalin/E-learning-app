import Joi from "joi";
import { Review } from "../models/creator.model";
import { LectureProgress } from "../models/lecture-model";

export const reviewSchema = Joi.object<Review, true>().keys({
	author: Joi.string().required().messages({
		"any.required": "author is required",
		"string.empty": "author cannot be empty",
	}),
	profilePicture: Joi.string().allow("").optional(),
	message: Joi.string().allow("").optional(),
	rating: Joi.custom((value) => {
		if (typeof value !== "number") {
			throw new Error("Not a number");
		}
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
