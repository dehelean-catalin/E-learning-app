type PasswordReggex = (password: string) => boolean;
type ErrorMessageSchema = (v: string, t: boolean) => string | undefined;

export const passwordReggex: PasswordReggex = (password) => {
	return !!password
		.trim()
		.search(
			/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{6,20}$/
		);
};
export const errorMessageSchema: ErrorMessageSchema = (value, touched) => {
	if (touched && !passwordReggex(value)) {
		return "Password must have at least 6 characters";
	}
};
