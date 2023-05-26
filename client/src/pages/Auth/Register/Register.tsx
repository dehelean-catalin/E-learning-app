import { SubmitButton } from "components/Forms";
import InputPasswordField from "components/Forms/Inputs/PRPassword/InputPasswordField";
import {
	formatDisplayNameError,
	formatEmailError,
	formatPasswordError,
} from "helpers/registerHelper";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputTextField from "../../../components/Forms/Inputs/InputTextField/InputTextField";
import AuthForm from "../../../components/auth/AuthForm/AuthForm";
import { passwordReggex } from "../../../helpers/inputPasswordHelper";
import { useAuthentication } from "../../../hooks/useAuthentication";
import styles from "./Register.module.scss";

const Register = () => {
	const { isLoading, handleRegister, error } = useAuthentication();

	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [displayNameTouched, setDisplayNameTouched] = useState(false);
	const [emailTouched, setEmailTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);

	const hasValue = !!email && !!password && !!displayName;
	const disabled = !hasValue || passwordReggex(password);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (disabled) return;

		const data = {
			email,
			password,
			displayName,
		};

		handleRegister(data);
		setDisplayNameTouched(false);
		setPasswordTouched(false);
		setEmailTouched(false);
	};

	return (
		<div>
			<AuthForm
				title="Create account"
				onSubmit={handleSubmit}
				button={
					<SubmitButton
						label={"Sign Up"}
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
					onChange={setEmail}
					onBlur={() => setEmailTouched(true)}
					errorMessage={formatEmailError(error, email, emailTouched)}
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
