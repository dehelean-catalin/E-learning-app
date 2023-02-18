const authenticationErrorService = () => {
	const getLoginError = (err) => {
		const { code } = err;
		if (
			code === "auth/wrong-password" ||
			code === "auth/invalid-email" ||
			code === "auth/user-not-found"
		) {
			return { code: 400, message: "Invalid email or password" };
		}
		if (code === "auth/too-many-requests") {
			return {
				code: 400,
				message:
					"Access to this account has been temporarily disabled due to many failed login attempts",
			};
		}
		return err.response.data;
	};
	const getRegisterError = (err) => {
		const { code } = err;
		if (err.code === "auth/weak-password") {
			return { code: 400, message: "Password is too weak" };
		}
		if (err.code === "auth/invalid-email") {
			return { code: 400, message: "Invalid email" };
		}
		if (err.code === "auth/email-already-in-use") {
			return { code: 400, message: "Email already in use" };
		}
		return err.response.data;
	};
	return {
		getLoginError,
		getRegisterError,
	};
};

export default authenticationErrorService;
