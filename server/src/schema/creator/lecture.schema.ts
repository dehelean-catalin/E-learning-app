import Joi from "joi";
import { CreatedLectureModel } from "../../models/creator.model";
import { ContentSchema } from "./content.schema";
import { PublishSchema } from "./publish.schema";

export const LectureSchema = Joi.object<CreatedLectureModel, true>({
	id: Joi.string().required().messages({
		"any.required": "Id is required",
		"string.empty": "Id cannot be empty",
	}),
	lastUpdate: Joi.number().required().messages({
		"any.required": "Last update is required",
	}),
	publish: PublishSchema,
	content: ContentSchema,
	requirements: Joi.array().required(),
	goals: Joi.array().required(),
	rating: Joi.number().allow(null).required().messages({
		"any.required": "rating is required",
	}),
	enrolledUsers: Joi.array().required(),
	numberOfRatings: Joi.number().required().messages({
		"any.required": "numberOfRatings is required",
	}),
	duration: Joi.number().required().messages({
		"any.required": "duration is required",
	}),
});

export const PublicLectureSchema = LectureSchema.custom(
	(value: CreatedLectureModel, helpers) => {
		if (value.requirements.filter((r) => r.length > 0).length < 3)
			throw new Error("Not enough requirements");
		if (value.goals.filter((r) => r.length > 0).length < 3)
			throw new Error("Not enough goals");
		if (value.duration < 100) throw new Error("Not enough content");

		return value;
	}
);
