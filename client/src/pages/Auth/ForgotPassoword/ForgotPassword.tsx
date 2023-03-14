import InfoBoxEmail from "components/InfoBoxEmail/InfoBoxEmail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import InputTextField from "../../../common/InputTextField/InputTextField";
import { AuthActions, AuthState } from "../../../data/redux/auth/authReducer";
import { RootState } from "../../../data/redux/reducers";
import styles from "./ForgotPassword.module.scss";
const ForgotPassword = () => {
	const dispatch = useDispatch();
	const state = useSelector<RootState, AuthState>((s) => s.authReducer);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(AuthActions.forgotPasswordRequest(state.value));
	};

	useEffect(() => {
		return () => {
			dispatch(AuthActions.clearState());
		};
	}, []);

	const getContent = () => {
		if (state.isValid) {
			return <InfoBoxEmail link="reset password link" email={state.value} />;
		}
		return (
			<form onSubmit={handleSubmit}>
				<div className={styles.title}>Forget password</div>
				<div className={styles.info}>
					Enter the email address associated with your account and we will send
					a link to reset your password
				</div>
				<InputTextField
					label="Email"
					value={state.value}
					onChange={(e) => {
						dispatch(AuthActions.setInputValue(e));
					}}
					placeholder="Enter email"
					overlay="white"
				/>
				<button disabled={!state.value?.length}>Continue</button>
				<div className={styles.link}>
					<span>Are you new here? Join us</span>
					<NavLink to={"/register"} className={styles.link}>
						Sign up
					</NavLink>
				</div>
			</form>
		);
	};
	return <div className={styles["forgot-password"]}>{getContent()}</div>;
};

export default ForgotPassword;
