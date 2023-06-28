import InputPasswordField from "components/Inputs/PRPassword/InputPasswordField";
import {
	formatDisplayNameError,
	formatEmailError,
	formatPasswordError,
} from "helpers/registerHelper";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputTextField from "../../../components/Inputs/InputTextField/InputTextField";
import PRButton from "../../../components/PRButton/PRButton";
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
