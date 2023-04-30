import Joi from "joi";
import {
	Content,
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

const lectureDurationBasedOnContent = (data: Content[]) => {
	let totalDuration = 0;

	for (const i in data) {
		for (const j in data[i].children) {
			totalDuration += data[i].children[j].data.duration;
		}
	}

	return totalDuration;
};

export const PublicLectureSchema = LectureSchema.custom(
	(value: CreatedLectureModel, helpers) => {
		if (value.requirements.filter((r) => r.value.length > 0).length < 3)
			throw new Error("Not enough requirements");
		if (value.goals.filter((r) => r.value.length > 0).length < 3)
			throw new Error("Not enough goals");
		if (lectureDurationBasedOnContent(value.content) < 100)
			throw new Error("Not enough content");

		return value;
	}
);
