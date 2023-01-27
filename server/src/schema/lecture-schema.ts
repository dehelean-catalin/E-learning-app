import joiDate from "@joi/date";
import coreJoi from "joi";

import {
	Item,
	LectureModel,
	ReviewItem,
	ReviewList,
	TreeChild,
	TreeNode,
} from "../models/lecture-model";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;
const children = Joi.object<TreeChild, true>().keys({
	key: Joi.string().required(),
	label: Joi.string().required(),
	data: Joi.object().keys({
		url: Joi.string().required(),
		duration: Joi.custom((value) => {
			if (typeof value !== "number") {
				throw new Error("Not a number");
			}
			return value;
		}).required(),
		lastUpdate: Joi.date().format("YYYY-MM-DD").required(),
	}),
});

const reviewItem = Joi.object<ReviewItem, true>().keys({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	comment: Joi.string().required(),
	rating: Joi.custom((value) => {
		if (typeof value !== "number") {
			throw new Error("Not a number");
		}
		return value;
	}).required(),
	date: Joi.date().format("YYYY-MM-DD").required(),
});

const items = Joi.object<TreeNode, true>().keys({
	key: Joi.string().required().messages({
		"any.required": "Key is required",
	}),
	label: Joi.string().required().messages({
		"any.required": "label is required",
	}),
	children: Joi.array().items(children).required().messages({
		"any.required": "children is required",
	}),
});

export const LectureSchema = Joi.object<Omit<LectureModel, "id">, true>({
	title: Joi.string().required().messages({
		"any.required": "Title is required",
	}),
	details: Joi.string().required().messages({
		"any.required": "details is required",
	}),
	description: Joi.object().required().messages({
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
	createdAt: Joi.date().format("YYYY-MM-DD").required().messages({
		"any.required": "createdAt is required",
	}),
	numberOfUsers: Joi.array().required().messages({
		"any.required": "numberOfUsers is required",
	}),
	language: Joi.string().required().messages({
		"any.required": "language is required",
	}),
	items: Joi.object<Item>()
		.keys({
			description: Joi.string().required(),
			data: Joi.array<TreeNode[]>().items(items).required(),
		})
		.required(),
	reviewList: Joi.object<ReviewList>()
		.keys({
			description: Joi.string().required(),
			data: Joi.array<ReviewItem[]>().items(reviewItem).required(),
		})
		.required(),
});
