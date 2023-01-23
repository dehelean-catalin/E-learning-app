type PasswordReggex = (password: string) => boolean;
type ErrorMessageSchema = (v: string, t: boolean) => string | undefined;

export const passwordReggex: PasswordReggex = (password) => {
	return !!!password
		.trim()
		.search("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$");
};
export const errorMessageSchema: ErrorMessageSchema = (value, touched) => {
	if (touched && !passwordReggex(value)) {
		return "Password must have at least 6 characters";
	}
};
