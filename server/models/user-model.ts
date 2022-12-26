import Joi from "joi";

export const userModel = Joi.object({
	firstName: Joi.string().required().messages({
		"any.required": "FirstName is required",
	}),
	lastName: Joi.string().required().messages({
		"any.required": "lastName is required",
	}),
	phoneNumber: Joi.number().required().messages({
		"any.required": "phoneNumber is required",
	}),
	address: Joi.string().required().messages({
		"any.required": "address is required",
	}),
	favoriteTopics: Joi.string().required().messages({
		"any.required": "favoriteTopics is required",
	}),
	profilePicture: Joi.string().required().messages({
		"any.required": "profilePicture is required",
	}),
	degree: Joi.string().required().messages({
		"any.required": "degree is required",
	}),
	institution: Joi.string().required().messages({
		"any.required": "institution is required",
	}),
	institutionKey: Joi.string().required().messages({
		"any.required": "institutionKey is required",
	}),
	aboutYou: Joi.string().required().messages({
		"any.required": "aboutYou is required",
	}),
	links: Joi.string().required().messages({
		"any.required": "links is required",
	}),
	role: Joi.string().required().messages({
		"any.required": "role is required",
	}),
	savedLectures: Joi.array().required().messages({
		"any.required": "savedLectures is required",
	}),
});

export const userSavedLectureModel = Joi.object({
	id: Joi.string().required().messages({
		"any.required": "Lecture id is required",
	}),
});

export const userDetailsModel = Joi.object({
	firstName: Joi.string().required().messages({
		"any.required": "FirstName is required",
	}),
	lastName: Joi.string().required().messages({
		"any.required": "lastName is required",
	}),
	phoneNumber: Joi.number().required().messages({
		"any.required": "phoneNumber is required",
	}),
	address: Joi.string().required().messages({
		"any.required": "address is required",
	}),
	aboutYou: Joi.string().required().messages({
		"any.required": "aboutYou is required",
	}),
});
