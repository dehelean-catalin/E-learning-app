import Joi from "joi";
import { Publish } from "../../models/creator.model";

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
