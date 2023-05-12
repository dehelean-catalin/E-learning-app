import Joi from "joi";
import { Review } from "../models/creator.model";

export const reviewSchema = Joi.object<Review, true>().keys({
	author: Joi.string().required().messages({
		"any.required": "author is required",
		"string.empty": "author cannot be empty",
	}),
	message: Joi.string().optional(),
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
