import Joi from "joi";
import {
	Content,
	CreatedLectureModel,
	LectureTemplateData,
	Publish,
} from "../models/creatorModels";

export const lectureTemplateSchema = Joi.object<LectureTemplateData, true>({
	title: Joi.string().required().messages({
		"any.required": "title is required",
		"string.empty": "title cannot be empty",
	}),
	category: Joi.string().required().messages({
		"any.required": "category is required",
		"string.empty": "category cannot be empty",
	}),
	language: Joi.string().required().messages({
		"any.required": "language is required",
		"string.empty": "language cannot be empty",
	}),
	author: Joi.string().required().messages({
		"any.required": "Invalid payload",
		"string.empty": "Invalid payload",
	}),
});

const LanguageEnum = Joi.string()
	.valid("English", "French", "Romanian")
	.required();

const CategoryEnum = Joi.string()
	.valid(
		"All",
		"Design",
		"Data science",
		"Web development",
		"Architecture",
		"Electronics",
		"Psychology",
		"History",
		"Policy"
	)
	.required();

const StatusEnum = Joi.string()
	.valid("Draft", "Public", "Private", "Unlisted")
	.required();

const LevelEnum = Joi.string()
	.valid("Beginner", "Intermediate", "Advanced", "Expert")
	.optional();

export const PublishSchema = Joi.object<Publish, true>({
	author: Joi.string().required().messages({
		"string.base": "Author name must be a string",
		"string.empty": "Author name cannot be empty",
		"any.required": "Author name is required",
	}),
	authorId: Joi.string().required().messages({
		"string.base": "authorId must be a string",
		"string.empty": "authorId cannot be empty",
		"any.required": "authorId is required",
	}),
	title: Joi.string().required().messages({
		"string.base": "Title must be a string",
		"string.empty": "Title cannot be empty",
		"any.required": "Title is required",
	}),
	category: CategoryEnum.messages({
		"any.required": "Category is required",
	}),
	description: Joi.string().optional().allow("").messages({
		"string.base": "Description must be a string",
		"string.empty": "Description cannot be empty",
	}),
	language: LanguageEnum.messages({
		"any.required": "Language is required",
	}),
	status: StatusEnum.messages({
		"any.required": "Status is required",
	}),
	level: LevelEnum.messages({
		"all.only":
			"Level is must be one of beginner, intermediate, advanced or expert",
	}),
	caption: Joi.string().optional().allow("").messages({
		"string.base": "Caption must be a string",
		"string.empty": "Caption cannot be empty",
	}),
	promoVideo: Joi.string().optional().allow("").messages({
		"string.base": "Promo video URL must be a string",
		"string.empty": "Promo video URL cannot be empty",
	}),
}).unknown(false);

const VideoStatusEnum = Joi.string()
	.valid("Success", "Failed", "pending")
	.required()
	.messages({
		"any.required": "Video status is required",
		"string.empty": "Video status cannot be empty",
		"any.only": 'Video status must be one of "Success", "Failed", or "pending"',
		"string.base": "Video status must be a string",
	});

export let ContentSchema = Joi.array<Content[]>().items({
	label: Joi.string().required().messages({
		"any.required": "Label is required",
		"string.empty": "Label cannot be empty",
		"string.base": "Label must be a string",
	}),
	data: Joi.string().optional().allow("").messages({
		"string.base": "Data Description must be a string",
	}),

	children: Joi.array()
		.items({
			label: Joi.string().required().messages({
				"any.required": "Label is required",
				"string.empty": "Label cannot be empty",
				"string.base": "Label must be a string",
			}),
			data: Joi.object({
				id: Joi.string().required().messages({
					"any.required": "Id is required",
					"string.empty": "Id cannot be empty",
					"string.base": "Id must be a string",
				}),
				description: Joi.string().optional().allow("").messages({
					"string.base": "Description must be a string",
				}),
				date: Joi.string().required().messages({
					"any.required": "Date is required",
					"string.empty": "Date cannot be empty",
					"string.base": "Date must be a string",
				}),
				duration: Joi.number().required().messages({
					"any.required": "Duration is required",
					"number.base": "Duration must be a number",
				}),
				content: Joi.string().required().messages({
					"any.required": "Content is required",
					"string.empty": "Content cannot be empty",
					"string.base": "Content must be a string",
				}),
				track: Joi.string(),
				type: Joi.string().required().messages({
					"any.required": "Type is required",
					"string.empty": "Type cannot be empty",
					"string.base": "Type must be a string",
				}),
				status: VideoStatusEnum,
			}),
		})
		.optional(),
});

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
		if (value.duration < 600)
			throw new Error("Content duration exceeds the allowed limits");

		if (!value.publish.author) throw new Error("Author is missing");
		if (!value.publish.title) throw new Error("Title is missing");
		if (!value.publish.description) throw new Error("Description is missing");
		if (!value.publish.caption) throw new Error("Caption is missing");
		if (!value.publish.promoVideo) throw new Error("Promo video is missing");

		return value;
	}
);
