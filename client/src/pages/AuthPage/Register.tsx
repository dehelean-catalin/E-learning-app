import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { useAuthentication } from "../../hooks/useAuthentication";
import image from "../../resources/images/PAINT.png";
import InputTextField from "../../common/InputTextField/InputTextField";
import InputPasswordField from "../../common/InputPasswordField/InputPasswordField";
import { ProgressSpinner } from "primereact/progressspinner";

const Register = () => {
	const { isLoading, handleRegister, error } = useAuthentication();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [firstNameTouched, setFirstNameTouched] = useState(false);
	const [lastNameTouched, setLastNameTouched] = useState(false);
	const [emailTouched, setEmailTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);

	const getPasswordErrorMessage = () => {
		if (error.message?.includes("Password") && !passwordTouched && !isLoading) {
			return error.message;
		}
		if (password.trim().length === 0 && passwordTouched) {
			return "Password cannot be empty";
		}
		if (password.trim().length < 6 && passwordTouched) {
			return "Password is too short";
		}
		if (
			password
				.trim()
				.search("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$") &&
			passwordTouched
		) {
			return "Password is invalid";
		}

		return "";
	};
	const getErrorMessage = (value, valueTouched, field) => {
		if (error.message?.includes(field) && !valueTouched && !isLoading) {
			return error.message;
		}
		if (value.trim().length === 0 && valueTouched) {
			return `${field} cannot be empty`;
		}
		return "";
	};

	const hasErrorPassword = getPasswordErrorMessage() !== "";
	const hasErrorsFirstName =
		getErrorMessage(firstName, firstNameTouched, "First name") !== "";
	const hasErrorsLastName =
		getErrorMessage(lastName, lastNameTouched, "Last name") !== "";
	const hasErrorsEmail = getErrorMessage(email, emailTouched, "Email") !== "";

	const hasErrors =
		hasErrorsEmail ||
		hasErrorPassword ||
		hasErrorsFirstName ||
		hasErrorsLastName;
	const hasValue = !!email && !!password && !!firstName && !!lastName;

	const getSignUpBtn = () => {
		if (isLoading) {
			return (
				<button>
					<ProgressSpinner className={styles.loading} strokeWidth={"6px"} />
				</button>
			);
		}
		return (
			<button
				className={styles["sign-up-btn"]}
				disabled={!hasValue || hasErrors}
			>
				Sign up
			</button>
		);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!hasValue || hasErrors) {
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
								errorMessage={getErrorMessage(
									firstName,
									firstNameTouched,
									"First name"
								)}
								hasError={hasErrorsFirstName}
							/>
							<InputTextField
								overlay="white"
								value={lastName}
								placeholder="Enter last name"
								label="Last Name"
								onChange={(s) => setLastName(s.replace(/[^a-z]/gi, ""))}
								onBlur={() => setLastNameTouched(true)}
								errorMessage={getErrorMessage(
									lastName,
									lastNameTouched,
									"Last name"
								)}
								hasError={hasErrorsLastName}
							/>
						</div>
						<InputTextField
							overlay="white"
							value={email}
							placeholder="Enter email"
							label="Email"
							onChange={(s) => setEmail(s)}
							onBlur={() => setEmailTouched(true)}
							errorMessage={getErrorMessage(email, emailTouched, "Email")}
							hasError={hasErrorsEmail}
						/>
						<InputPasswordField
							value={password}
							onChange={(s) => setPassword(s)}
							onBlur={() => setPasswordTouched(true)}
							errorMessage={getPasswordErrorMessage()}
							hasError={hasErrorPassword}
						/>
					</div>
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
