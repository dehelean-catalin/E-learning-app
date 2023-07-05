import Joi from "joi";
import { LectureTemplateData } from "../models/creator.model";

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
