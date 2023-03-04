export const formatEmailError = (email, emailTouched) => {
	if (email.trim().length === 0 && emailTouched) {
		return "Email is required";
	}
};

export const formatPasswordError = (
	error: null | { message: string },
	password: string,
	passwordTouched: boolean
) => {
	if (error?.message && !passwordTouched) {
		return error.message;
	}
	if (password.trim().length === 0 && passwordTouched) {
		return "Password is required";
	}

	return "";
};
