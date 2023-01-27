import { ProgressSpinner } from "primereact/progressspinner";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import InputPasswordField from "../../common/InputPasswordField/InputPasswordField";
import InputTextField from "../../common/InputTextField/InputTextField";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./Login.module.scss";
import { getErrorMessage } from "./services/formService";

const Login = () => {
	const { isLoading, handleLogin, error, handleLoginWithGoogle } =
		useAuthentication();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailTouched, setEmailTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);

	const getPasswordErrorMessage = () => {
		if (error && error.message !== null && !passwordTouched && !isLoading) {
			return error.message;
		}
		if (password.trim().length === 0 && passwordTouched) {
			return "Password is required";
		}

		return "";
	};

	const hasValue = !!email && !!password;
	const disabled = !hasValue || getPasswordErrorMessage();
	const getSignInBtn = () => {
		if (isLoading) {
			return (
				<button>
					<ProgressSpinner className={styles.loading} strokeWidth={"6px"} />
				</button>
			);
		}
		return <button disabled={disabled}>Sign in</button>;
	};

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (disabled) {
			return;
		}
		setPasswordTouched(false);
		setEmailTouched(false);
		handleLogin(email, password);
	};

	return (
		<div>
			<form className={styles["auth-form"]} onSubmit={submitHandler}>
				<div className={styles.title}>Sign in</div>
				<InputTextField
					overlay="white"
					value={email}
					placeholder="Enter email"
					label="Email"
					onChange={(e) => setEmail(e)}
					onBlur={() => setEmailTouched(true)}
					errorMessage={getErrorMessage(email, emailTouched)}
				/>
				<InputPasswordField
					overlay="white"
					value={password}
					onChange={(e) => setPassword(e)}
					onBlur={() => setPasswordTouched(true)}
					errorMessage={getPasswordErrorMessage()}
				/>
				<NavLink to="/forgot-password" className={styles.password}>
					Forget password?
				</NavLink>
				{getSignInBtn()}
				<div className={styles["google-sign-in"]}>
					<div className={styles.or}>
						<span>or</span>
					</div>
					<button type="button" onClick={handleLoginWithGoogle}>
						<img
							src="https://img.icons8.com/color/48/null/google-logo.png"
							alt=""
						/>
						Sign in with Google
					</button>
				</div>
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
