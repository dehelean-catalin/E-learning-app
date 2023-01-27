import Joi from "joi";
import { LoginModel, RegisterModel } from "../models/auth-model";

const pattern = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";

export const registerSchema = Joi.object<RegisterModel, true>({
	firstName: Joi.string().required().messages({
		"any.required": "First name is required",
		"string.empty": "First name cannot be empty",
	}),
	lastName: Joi.string().required().messages({
		"any.required": "Last name is required",
		"string.empty": "Last name cannot be empty",
	}),
	email: Joi.string().email().required().messages({
		"any.required": "Email is required",
		"string.empty": "Email cannot be empty",
		"string.email": "Email must be a valid",
	}),
	password: Joi.string().pattern(new RegExp(pattern)).required().messages({
		"any.required": "Password is required",
		"string.empty": "Password cannot be empty",
		"string.min": "Password is too short",
		"string.pattern.base": "Password is invalid",
	}),
	device: Joi.string().required().messages({
		"any.required": "Device is required",
		"string.empty": "Device cannot be empty",
		"string.email": "Device must be a valid",
	}),
});

export const loginSchema = Joi.object<LoginModel, true>({
	email: Joi.string().required().messages({
		"any.required": "Email is required",
		"string.empty": "Email cannot be empty",
	}),
	password: Joi.string().required().messages({
		"any.required": "Password is required",
		"string.empty": "Password cannot be empty",
	}),
	device: Joi.string().required().messages({
		"any.required": "Device is required",
		"string.empty": "Device cannot be empty",
	}),
});
