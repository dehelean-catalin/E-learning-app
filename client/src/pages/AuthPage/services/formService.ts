import { passwordReggex } from "../../../utils/inputPasswordHelper";
type GetErrorMessage = (value: string, touched: boolean, error?: any) => string;

export const getErrorMessage: GetErrorMessage = (value, touched, error) => {
	if (error && error.message?.includes("Email") && !touched) {
		return error.message;
	}
	if (value.trim().length === 0 && touched) {
		return "Required*";
	}
};

export const getPasswordErrorMessage = (value, touched, error) => {
	if (error.message?.includes("Password") && !touched) {
		return error.message;
	}
	if (value.trim().length === 0 && touched) {
		return "Password cannot be empty";
	}
	if (value.trim().length < 6 && touched) {
		return "Password is too short";
	}
	if (value.trim().length > 20 && touched) {
		return "Password is too long";
	}
	if (passwordReggex(value) && touched) {
		return "Password does not match the pattern";
	}
};
