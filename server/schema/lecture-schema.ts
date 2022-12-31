import Joi from "joi";
import {
	LectureItem,
	LectureModel,
	Review,
	TreeNode,
} from "../models/lecture-model";

const children = Joi.object<TreeNode, true>().keys({
	key: Joi.string().required(),
	label: Joi.string().required(),
	data: Joi.object().keys({
		url: Joi.string().required(),
		duration: Joi.number().required(),
	}),
});

const capitols = Joi.object<TreeNode, true>().keys({
	key: Joi.string().required(),
	label: Joi.string().required(),
	children: Joi.array().items(children),
});

const reviews = Joi.object<Review, true>().keys({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	comment: Joi.string().required(),
	rating: Joi.number().required(),
	date: Joi.string().required(),
});

const items = Joi.object<LectureItem, true>().keys({
	title: Joi.string().required(),
	description: Joi.string().required(),
	courseContent: Joi.array().items(capitols),
	items: Joi.array().items(reviews),
});

export const LectureSchema = Joi.object<LectureModel, true>({
	title: Joi.string().required().messages({
		"any.required": "Title is required",
	}),
	description: Joi.string().required().messages({
		"any.required": "Description is required",
	}),
	category: Joi.string().required().messages({
		"any.required": "category is required",
	}),
	subCategory: Joi.string().required().messages({
		"any.required": "subCategory is required",
	}),
	thumbnail: Joi.string().required().messages({
		"any.required": "Thumbnail is required",
	}),
	createdBy: Joi.string().required().messages({
		"any.required": "Createdby is required",
	}),
	createdAt: Joi.string().required().messages({
		"any.required": "createdAt is required",
	}),
	lastUpdate: Joi.string().required().messages({
		"any.required": "lastUpdate is required",
	}),
	rating: Joi.number().required().messages({
		"any.required": "Rating is required",
	}),
	numberOfRates: Joi.number().required().messages({
		"any.required": "Rating is required",
	}),
	numberOfUsers: Joi.array().required().messages({
		"any.required": "numberOfUsers is required",
	}),
	language: Joi.string().required().messages({
		"any.required": "language is required",
	}),
	items: Joi.array<LectureItem[]>().items(items).required(),
});
