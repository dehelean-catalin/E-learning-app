import { sendPasswordResetEmail } from "firebase/auth";
import { FormEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import InfoBoxEmail from "../../../components/InfoBoxEmail/InfoBoxEmail";
import InputTextField from "../../../components/Inputs/InputTextField/InputTextField";
import PRButton from "../../../components/PRButton/PRButton";
import auth from "../../../config/firebase.config";
import { formatEmailError } from "../../../data/helpers/registerHelper";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrMessage] = useState(null);
	const [emailTouched, setEmailTouched] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await sendPasswordResetEmail(auth, email);
			setEmailTouched(false);
			setVisible(true);
			setErrMessage("");
		} catch (error) {
			setErrMessage({ message: "Email not found" });
		} finally {
			setIsLoading(false);
		}
	};

	if (visible)
		return (
			<div className="m-auto">
				<InfoBoxEmail link="reset password link" email={email} />
			</div>
		);
	const emailErrorMessage = formatEmailError(errorMessage, email, emailTouched);
	return (
		<div className={styles["forgot-password"]}>
			<form onSubmit={handleSubmit}>
				<div className={styles.title}>Forget password</div>
				<div className={styles.info}>
					Enter the email address associated with your account and we will send
					a link to reset your password
				</div>
				<InputTextField
					label="Email"
					value={email}
					onChange={(e) => {
						if (errorMessage) {
							setErrMessage(null);
						}
						setEmail(e);
					}}
					placeholder="Enter email"
					overlay="white"
					onBlur={() => setEmailTouched(true)}
					errorMessage={emailErrorMessage}
				/>
				<PRButton
					label="Continue"
					className="mt-2"
					type="submit"
					loading={isLoading}
					disabled={!!emailErrorMessage || !emailTouched}
				/>
				<div className={styles.link}>
					<span>Are you new here? Join us</span>
					<NavLink to={"/register"} className={styles.link}>
						Sign up
					</NavLink>
				</div>
			</form>
		</div>
	);
};

export default ForgotPassword;
