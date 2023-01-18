import joiDate from "@joi/date";
import coreJoi from "joi";
import {
	UserDataModel,
	UserModel,
	LastEntry,
	WatchingLectureModel,
} from "../models/user-model";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

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
	aboutYou: Joi.string().required().messages({
		"any.required": "aboutYou is required",
	}),
	profilePicture: Joi.string().required().messages({
		"any.required": "profilePicture is required",
	}),
	bannerPicture: Joi.string().required().messages({
		"any.required": "bannerPicture is required",
	}),
	favoriteTopics: Joi.string().required().messages({
		"any.required": "favoriteTopics is required",
	}),
	savedLectures: Joi.array<string[]>().required().messages({
		"any.required": "savedLectures is required",
	}),
	watchingLectures: Joi.array().required().messages({
		"any.required": "watchingLectures is required",
	}),
});

export const UserDataSchema = Joi.object<UserDataModel, true>({
	firstName: Joi.string(),
	lastName: Joi.string(),
	phoneNumber: Joi.string().allow(""),
	address: Joi.string().allow(""),
	aboutYou: Joi.string().allow(""),
	email: Joi.string().allow(""),
	profilePicture: Joi.string().allow(""),
	bannerPicture: Joi.string().allow(""),
	favoriteTopics: Joi.array(),
	links: Joi.alternatives(),
});

export const WatchingLectureSchema = Joi.object<WatchingLectureModel, true>({
	id: Joi.string().required().messages({
		"any.required": "id is required",
	}),
	lastEntry: Joi.object().keys({
		page: Joi.string().required(),
		date: Joi.date().format("YYYY-MM-DD").required,
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
		"any.required": "time is required",
	}),
});

export const WatchingLectureLastEntrySchema = Joi.object<LastEntry>({
	date: Joi.date().format("YYY-MM-DD").required().messages({
		"any.required": "date is required",
	}),
	time: Joi.date().format("HH:mm:ss").required(),
	page: Joi.string().required().messages({
		"any.required": "page is required",
	}),
});
