import joiDate from "@joi/date";
import coreJoi from "joi";
import {
	AccountData,
	ConnectionItem,
	ProviderAccount,
} from "../models/userModels";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

export const AccountSchema = Joi.object<
	Omit<AccountData, "email" | "profilePicture">,
	true
>({
	displayName: Joi.string().required().messages({
		"any.required": "Name is required",
	}),
	phoneNumber: Joi.string().allow(""),
	address: Joi.string().allow(""),
	aboutYou: Joi.string().allow(""),
});

export const connectionSchema = Joi.object<Omit<ConnectionItem, "date">, true>({
	location: Joi.string().required().messages({
		"any.required": "City is required",
		"string.empty": "City cannot be empty",
	}),
	device: Joi.string().required().messages({
		"any.required": "Device is required",
		"string.empty": "Device cannot be empty",
	}),
});

export const createAccountSchema = Joi.object<ProviderAccount, true>().keys({
	displayName: Joi.string().required().messages({
		"any.required": "displayName is required",
		"string.empty": "displayName cannot be empty",
	}),
	email: Joi.string().email().required().messages({
		"any.required": "Email is required",
		"string.empty": "Email cannot be empty",
		"string.email": "Email must be a valid",
	}),
	device: Joi.string().required().messages({
		"any.required": "Device is required",
		"string.empty": "Device cannot be empty",
	}),
	location: Joi.string().required().messages({
		"any.required": "City is required",
		"string.empty": "City cannot be empty",
	}),
});

export const providerAccountSchema = createAccountSchema.keys({
	photoURL: Joi.string().required(),
});
