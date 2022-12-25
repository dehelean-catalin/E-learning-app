import Joi from "joi";

const capitol = Joi.object().keys({
	title: Joi.string().required(),
	time: Joi.string().required(),
});
const capitols = Joi.object().keys({
	title: Joi.string().required(),
	items: Joi.array().items(capitol).required(),
});

const reviews = Joi.object().keys({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	comment: Joi.string().required(),
	rating: Joi.number().required(),
	date: Joi.string().required(),
});

const items = Joi.object().keys({
	title: Joi.string().required(),
	description: Joi.string().required(),
	courseContent: Joi.array().items(capitols),
	items: Joi.array().items(reviews),
});

export const lectureSchema = Joi.object({
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
	numberOfUsers: Joi.number().required().messages({
		"any.required": "numberOfUsers is required",
	}),
	numberOfChapters: Joi.number().required().messages({
		"any.required": "numberOfChapters is required",
	}),
	totalHours: Joi.number().required().messages({
		"any.required": "totalHours is required",
	}),
	language: Joi.string().required().messages({
		"any.required": "language is required",
	}),
	details: Joi.array().required().messages({
		"any.required": "Details is required",
	}),
	items: Joi.array().items(items).required(),
});
