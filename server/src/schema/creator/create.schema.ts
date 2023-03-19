import Joi from "joi";
import { CreateLecture } from "../../models/creator/create.model";

export const createLectureSchema = Joi.object<CreateLecture, true>({
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
});
