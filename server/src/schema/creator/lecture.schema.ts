import Joi from "joi";
import {
	CreatedLectureModel,
	PlanFieldModel,
} from "../../models/creator.model";
import { ContentSchema } from "./content.schema";
import { PublishSchema } from "./publish.schema";

const PlanFieldSchema = Joi.array<PlanFieldModel[]>()
	.items({
		value: Joi.string().required().allow("").max(80).messages({
			"any.required": "Value is required",
			"string.empty": "Value cannot be empty",
			"string.max": "The value must be at most {#limit} characters",
		}),
		placeholder: Joi.string().required(),
	})
	.optional();

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
	requirements: PlanFieldSchema,
	goals: PlanFieldSchema,
	reviews: Joi.array(),
	comments: Joi.array(),
	enrolledUsers: Joi.array(),
});
