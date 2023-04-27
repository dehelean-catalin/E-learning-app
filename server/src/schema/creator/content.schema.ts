import * as Joi from "joi";
import { Content } from "../../models/creator.model";

const VideoStatusEnum = Joi.string()
	.valid("published", "draft", "pending")
	.required()
	.messages({
		"any.required": "Video status is required",
		"string.empty": "Video status cannot be empty",
		"any.only":
			'Video status must be one of "published", "draft", or "pending"',
		"string.base": "Video status must be a string",
	});

export let ContentSchema = Joi.array<Content[]>().items({
	label: Joi.string().required().messages({
		"any.required": "Label is required",
		"string.empty": "Label cannot be empty",
		"string.base": "Label must be a string",
	}),
	data: Joi.object({
		description: Joi.string().required().messages({
			"any.required": "Description is required",
			"string.empty": "Description cannot be empty",
			"string.base": "Description must be a string",
		}),
	}),
	children: Joi.array()
		.items({
			label: Joi.string().required().messages({
				"any.required": "Label is required",
				"string.empty": "Label cannot be empty",
				"string.base": "Label must be a string",
			}),
			data: Joi.object({
				description: Joi.string().required().messages({
					"any.required": "Description is required",
					"string.empty": "Description cannot be empty",
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
