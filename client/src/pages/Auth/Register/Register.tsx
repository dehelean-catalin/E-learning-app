import InputPasswordField from "components/Inputs/PRPassword/InputPasswordField";
import {
	formatDisplayNameError,
	formatEmailError,
	formatPasswordError,
} from "data/helpers/registerHelper";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputTextField from "../../../components/Inputs/InputTextField/InputTextField";
import PRButton from "../../../components/PRButton/PRButton";
import AuthForm from "../../../components/auth/AuthForm/AuthForm";
import { passwordReggex } from "../../../data/helpers/inputPasswordHelper";
import { useAuthentication } from "../../../data/hooks/useAuthentication";
import styles from "./Register.module.scss";

const Register = () => {
	const { isLoading, handleRegister, error, setError } = useAuthentication();

	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [displayNameTouched, setDisplayNameTouched] = useState(false);
	const [emailTouched, setEmailTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);

	const hasValue =
		!formatEmailError(error, email, emailTouched) &&
		!!password &&
		!!displayName;
	const disabled = !hasValue || passwordReggex(password);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (disabled) return;

		const data = {
			email,
			password,
			displayName,
		};

		await handleRegister(data);
	};

	const emailErrorMessage = formatEmailError(error, email, emailTouched);
	console.log(emailErrorMessage);

	return (
		<div className="m-auto">
			<AuthForm
				title="Create account"
				onSubmit={handleSubmit}
				button={
					<PRButton
						label="Sign Up"
						type="submit"
						style={{ height: "35px" }}
						disabled={disabled}
						loading={isLoading}
					/>
				}
			>
				<InputTextField
					overlay="white"
					value={displayName}
					placeholder="Enter display name"
					label="Display Name"
					onChange={setDisplayName}
					onBlur={() => setDisplayNameTouched(true)}
					errorMessage={formatDisplayNameError(displayName, displayNameTouched)}
				/>
				<InputTextField
					overlay="white"
					value={email}
					placeholder="Enter email"
					label="Email"
					onChange={(v) => {
						if (!!emailErrorMessage) {
							setError(null);
						}
						setEmail(v);
					}}
					onBlur={() => setEmailTouched(true)}
					errorMessage={emailErrorMessage}
				/>
				<InputPasswordField
					overlay="white"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					feedback={true}
					onBlur={() => setPasswordTouched(true)}
					errorMessage={formatPasswordError(error, password, passwordTouched)}
				/>
			</AuthForm>

			<div className={styles["sign-up-info"]}>
				Already have an account?
				<Link to={"/login"} className={styles.link}>
					Sign in
				</Link>
			</div>
		</div>
	);
};

export default Register;
