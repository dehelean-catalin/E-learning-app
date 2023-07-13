import Joi from "joi";
import { ReviewData } from "../models/creatorModels";

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
