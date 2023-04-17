import { passwordReggex } from "./inputPasswordHelper";

export const formatEmailError = (
	error: null | { message: string },
	email: string,
	emailTouched: boolean
) => {
	console.log(error.message);
	if (error?.message?.toLocaleLowerCase().includes("email") && !emailTouched) {
		return error.message;
	}
	if (email?.trim().length === 0 && emailTouched) {
		return "Email is required";
	}
};

export const formatDisplayNameError = (
	email: string | null,
	emailTouched: boolean
) => {
	if (email?.trim().length === 0 && emailTouched) {
		return "Name is required";
	}
};

export const formatPasswordError = (
	error: null | { message: string },
	password: string | null,
	passwordTouched: boolean
) => {
	if (error?.message.includes("Password") && !passwordTouched) {
		return error.message;
	}
	if (password.trim().length === 0 && passwordTouched) {
		return "Password is required";
	}
	if (password.trim().length < 6 && passwordTouched) {
		return "Password is too short";
	}
	if (password.trim().length > 20 && passwordTouched) {
		return "Password is too long";
	}
	if (passwordReggex(password) && passwordTouched) {
		return "Password does not match the pattern";
	}
};
