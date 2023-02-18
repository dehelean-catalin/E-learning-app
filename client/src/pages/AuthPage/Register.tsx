import { GoogleAuthProvider } from "firebase/auth";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputPasswordField from "../../common/InputPasswordField/InputPasswordField";
import InputTextField from "../../common/InputTextField/InputTextField";
import { useAuthentication } from "../../hooks/useAuthentication";
import image from "../../layout/images/PAINT.png";
import { passwordReggex } from "../../utils/inputPasswordHelper";
import styles from "./Login.module.scss";
import {
	getErrorMessage,
	getPasswordErrorMessage,
} from "./services/formService";

const Register = () => {
	const { isLoading, handleRegister, error, registerWithProvider } =
		useAuthentication();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [firstNameTouched, setFirstNameTouched] = useState(false);
	const [lastNameTouched, setLastNameTouched] = useState(false);
	const [emailTouched, setEmailTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);

	const hasValue = !!email && !!password && !!firstName && !!lastName;
	const disabled = !hasValue || passwordReggex(password);
	const getSignUpBtn = () => {
		if (isLoading) {
			return (
				<button>
					<ProgressSpinner className={styles.loading} strokeWidth={"6px"} />
				</button>
			);
		}
		return (
			<button className={styles["sign-up-btn"]} disabled={disabled}>
				Sign up
			</button>
		);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (disabled) {
			return;
		}
		const data = {
			email,
			password,
			firstName,
			lastName,
		};
		handleRegister(data);
		setFirstNameTouched(false);
		setLastNameTouched(false);
		setPasswordTouched(false);
		setEmailTouched(false);
	};

	return (
		<div className={styles["auth-page"]}>
			<form onSubmit={handleSubmit}>
				<div className={styles.container}>
					<div>
						<div className={styles["register-title"]}>Create account</div>
						<img src={image} alt="" />
					</div>

					<div>
						<div className={styles.initials}>
							<InputTextField
								overlay="white"
								value={firstName}
								placeholder="Enter first name"
								label="First Name"
								onChange={(s) => setFirstName(s.replace(/[^a-z]/gi, ""))}
								onBlur={() => setFirstNameTouched(true)}
								errorMessage={getErrorMessage(firstName, firstNameTouched)}
							/>
							<InputTextField
								overlay="white"
								value={lastName}
								placeholder="Enter last name"
								label="Last Name"
								onChange={(s) => setLastName(s.replace(/[^a-z]/gi, ""))}
								onBlur={() => setLastNameTouched(true)}
								errorMessage={getErrorMessage(lastName, lastNameTouched)}
							/>
						</div>
						<InputTextField
							overlay="white"
							value={email}
							placeholder="Enter email"
							label="Email"
							onChange={(s) => setEmail(s)}
							onBlur={() => setEmailTouched(true)}
							errorMessage={getErrorMessage(email, emailTouched, error)}
						/>
						<InputPasswordField
							overlay="white"
							value={password}
							onChange={(s) => setPassword(s)}
							onBlur={() => setPasswordTouched(true)}
							errorMessage={getPasswordErrorMessage(
								password,
								passwordTouched,
								error
							)}
						/>
					</div>
					<button
						onClick={() => registerWithProvider(new GoogleAuthProvider())}
					></button>
				</div>
				{getSignUpBtn()}
			</form>
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
