import Joi from "joi";
import {
	UserDataModel,
	UserModel,
	WatchingLectureModel,
} from "../models/user-model";

export const UserSchema = Joi.object<UserModel>({
	email: Joi.string().required().messages({
		"any.required": "email is required",
	}),
	firstName: Joi.string().required().messages({
		"any.required": "firstName is required",
	}),
	lastName: Joi.string().required().messages({
		"any.required": "lastName is required",
	}),
	phoneNumber: Joi.string().required().messages({
		"any.required": "phoneNumber is required",
	}),
	address: Joi.string().required().messages({
		"any.required": "address is required",
	}),
	profilePicture: Joi.string().required().messages({
		"any.required": "profilePicture is required",
	}),
	// favoriteTopics: Joi.string().required().messages({
	// 	"any.required": "favoriteTopics is required",
	// }),

	// degree: Joi.string().required().messages({
	// 	"any.required": "degree is required",
	// }),
	// institution: Joi.string().required().messages({
	// 	"any.required": "institution is required",
	// }),
	// institutionKey: Joi.string().required().messages({
	// 	"any.required": "institutionKey is required",
	// }),
	// aboutYou: Joi.string().required().messages({
	// 	"any.required": "aboutYou is required",
	// }),
	// links: Joi.string().required().messages({
	// 	"any.required": "links is required",
	// }),
	// role: Joi.string().required().messages({
	// 	"any.required": "role is required",
	// }),
	aboutYou: Joi.string().required().messages({
		"any.required": "aboutYou is required",
	}),
	savedLectures: Joi.array<string[]>().required().messages({
		"any.required": "savedLectures is required",
	}),
	watchingLectures: Joi.array().required().messages({
		"any.required": "watchingLectures is required",
	}),
});

export const UserDataSchema = Joi.object<UserDataModel, true>({
	firstName: Joi.string().required().messages({
		"any.required": "firstName is required",
	}),
	lastName: Joi.string().required().messages({
		"any.required": "lastName is required",
	}),
	phoneNumber: Joi.string().required().messages({
		"any.required": "phoneNumber is required",
	}),
	address: Joi.string().required().messages({
		"any.required": "address is required",
	}),
	aboutYou: Joi.string().required().messages({
		"any.required": "aboutYou is required",
	}),
});

export const WatchingLectureSchema = Joi.object<WatchingLectureModel, true>({
	id: Joi.string().required().messages({
		"any.required": "id is required",
	}),
	items: Joi.array()
		.items({
			page: Joi.string().required().messages({
				"any.required": "page is required",
			}),
			url: Joi.string().required().messages({
				"any.required": "url is required",
			}),
			title: Joi.string().required().messages({
				"any.required": "title is required",
			}),
			currentProgress: Joi.number().required().messages({
				"any.required": "currentProgress is required",
			}),
			confirmedProgress: Joi.number().required().messages({
				"any.required": "confirmedProgress is required",
			}),
			duration: Joi.number().required().messages({
				"any.required": "duration is required",
			}),
		})
		.required(),
});

export const WatchingLectureTimeSchema = Joi.object({
	time: Joi.number().required().messages({
		"any.required": "id is required",
	}),
});
