import { sendPasswordResetEmail } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { NavLink } from "react-router-dom";
import InfoBoxEmail from "../../../components/InfoBoxEmail/InfoBoxEmail";
import InputTextField from "../../../components/Inputs/InputTextField/InputTextField";
import PRButton from "../../../components/PRButton/PRButton";
import auth from "../../../config/firebase.config";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrMessage] = useState("");

	const { mutate: handleSubmit, isLoading } = useMutation(
		(e: FormEvent) => {
			e.preventDefault();
			if (!email.length) return;

			return sendPasswordResetEmail(auth, email);
		},
		{
			onSuccess: () => {
				setVisible(true);
				setErrMessage("");
			},
			onError: (err: any) => setErrMessage(err.response.data.message),
		}
	);

	if (visible)
		return (
			<div className="m-auto">
				<InfoBoxEmail link="reset password link" email={email} />
			</div>
		);

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
					onChange={(e) => setEmail(e)}
					placeholder="Enter email"
					overlay="white"
					errorMessage={errorMessage}
				/>
				<PRButton
					label="Continue"
					className="mt-2"
					type="submit"
					loading={isLoading}
					disabled={!email.length}
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
