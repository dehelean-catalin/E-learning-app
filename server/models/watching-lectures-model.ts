export interface WatchingLecture {
	id: string;
	items: WatchingLectureItem[];
}
export interface WatchingLectureItem {
	title: string;
	url: string;
	page: string;
	duration: number;
	currentProgress: number;
	confirmedProgress: number;
}
import Joi from "joi";
export const WatchingLectureModel = Joi.object<WatchingLecture>({
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
