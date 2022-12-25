import Joi from "joi";
// if (req.body?.firstName.trim().length < 3) {
// 	return res.status(400).json({ firstName: "Required length: 3" });
// }
// if (req.body?.lastName.trim().length < 3) {
// 	return res.status(400).json({ lastName: "Required length: 3" });
// }
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

export const wachingLecturesModel = Joi.object({
	id: Joi.string().required().messages({
		"any.required": "id is required",
	}),
	progress: Joi.array().items({
		page: Joi.string().required().messages({
			"any.required": "id is required",
		}),
		value: Joi.number().required().messages({
			"any.required": "id is required",
		}),
	}),
});
