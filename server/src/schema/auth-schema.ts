import Joi from "joi";
import { LoginModel, ProviderAuthModel } from "../models/auth-model";

export const registerSchema = Joi.object<ProviderAuthModel, true>({
	displayName: Joi.string().required().messages({
		"any.required": "Last name is required",
		"string.empty": "Last name cannot be empty",
	}),
	email: Joi.string().email().required().messages({
		"any.required": "Email is required",
		"string.empty": "Email cannot be empty",
		"string.email": "Email must be a valid",
	}),
	uid: Joi.string().required().messages({
		"any.required": "uid is required",
		"string.empty": "uid cannot be empty",
	}),
	device: Joi.string().required().messages({
		"any.required": "Device is required",
		"string.empty": "Device cannot be empty",
	}),
	photoURL: Joi.string(),
	emailVerified: Joi.string(),
});

export const loginSchema = Joi.object<LoginModel, true>({
	email: Joi.string().required().messages({
		"any.required": "Email is required",
		"string.empty": "Email cannot be empty",
	}),
	uid: Joi.string().required().messages({
		"any.required": "Uid is required",
		"string.empty": "Uid cannot be empty",
	}),
	device: Joi.string().required().messages({
		"any.required": "Device is required",
		"string.empty": "Device cannot be empty",
	}),
});
