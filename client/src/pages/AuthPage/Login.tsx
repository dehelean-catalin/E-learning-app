import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { useAuthentication } from "../../hooks/useAuthentication";
import LoginImg from "../../resources/images/login.jpg";
import InputTextField from "../../common/InputTextField/InputTextField";
import InputPasswordField from "../../common/InputPasswordField/InputPasswordField";
import { ProgressSpinner } from "primereact/progressspinner";

const Login = () => {
	const { isLoading, handleLogin, error } = useAuthentication();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailTouched, setEmailTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);
	const getEmailErrorMessage = () => {
		if (email.trim().length === 0 && emailTouched) {
			return "Email is required";
		}
		return "";
	};
	const getPasswordErrorMessage = () => {
		if (error.message !== null && !passwordTouched && !isLoading) {
			return error.message;
		}
		if (password.trim().length === 0 && passwordTouched) {
			return "Password is required";
		}

		return "";
	};

	const hasErrorPassword = getPasswordErrorMessage() !== "";
	const hasErrorEmail = getEmailErrorMessage() !== "";
	const hasValue = !!email && !!password;
	const getSignInBtn = () => {
		if (isLoading) {
			return (
				<button>
					<ProgressSpinner className={styles.loading} strokeWidth={"6px"} />
				</button>
			);
		}
		return <button disabled={!hasValue}>Sign in</button>;
	};

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (!hasValue) {
			return;
		}
		setPasswordTouched(false);
		setEmailTouched(false);
		handleLogin(email, password);
	};

	return (
		<div className={styles["auth-page"]}>
			<form onSubmit={submitHandler}>
				<img src={LoginImg} alt="not found" />
				<div className={styles.title}>Sign in</div>

				<InputTextField
					overlay="white"
					value={email}
					placeholder="Enter email"
					label="Email"
					onChange={(e) => setEmail(e)}
					onBlur={() => setEmailTouched(true)}
					errorMessage={getEmailErrorMessage()}
					hasError={hasErrorEmail}
				/>
				<InputPasswordField
					value={password}
					onChange={(e) => setPassword(e)}
					onBlur={() => setPasswordTouched(true)}
					errorMessage={getPasswordErrorMessage()}
					hasError={hasErrorPassword}
				/>

				{getSignInBtn()}
			</form>

			<div className={styles["sign-up-info"]}>
				You are new here? Join us
				<Link to={"/register"} className={styles.link}>
					Sign up
				</Link>
			</div>
		</div>
	);
};

export default Login;
