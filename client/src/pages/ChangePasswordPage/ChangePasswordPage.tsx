import { useState } from "react";
import Button from "../../common/Button/Button";
import Divider from "../../common/Divider/Divider";
import InputPasswordField from "../../common/InputPasswordField/InputPasswordField";
import { useAxios } from "../../config/axiosInstance";
import {
	errorMessageSchema,
	passwordReggex,
} from "../../utils/inputPasswordHelper";
import ActivityCard from "./ActivityCard";
import styles from "./ChangePasswordPage.module.scss";

const ChangePasswordPage = () => {
	const axiosInstance = useAxios();
	const [password, setPassword] = useState({
		value: "",
		confirmedValue: "",
	});
	const [touched, setTouched] = useState({
		value: false,
		confirmedValue: false,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!passwordReggex(password.value)) {
			throw new Error("Salut");
		}
		axiosInstance.post("/change-password", { newPassword: password });
	};
	const errorMessage = errorMessageSchema(password.value, touched.value);

	const disabled =
		!!!password.value.length ||
		password.confirmedValue !== password.value ||
		!!errorMessage;

	const confirmedPasswordError = () => {
		if (touched.confirmedValue && password.value !== password.confirmedValue) {
			return "Passwords does not match";
		}
	};

	return (
		<div className={styles["security-page"]}>
			Security Login Activity
			<ActivityCard />
			<Divider />
			Change password
			<form onSubmit={handleSubmit}>
				<InputPasswordField
					label="New password"
					value={password.value}
					errorMessage={errorMessage}
					onChange={(e) => {
						setPassword({ ...password, value: e });
					}}
					onBlur={() => setTouched({ ...touched, value: true })}
				/>
				<InputPasswordField
					label="Confirm new password"
					value={password.confirmedValue}
					errorMessage={confirmedPasswordError()}
					onChange={(e) => {
						setPassword({ ...password, confirmedValue: e });
					}}
					onBlur={() => setTouched({ ...touched, confirmedValue: true })}
				/>
				<div className={styles.btns}>
					<Button disabled={disabled}>Change password</Button>
				</div>
			</form>
		</div>
	);
};

export default ChangePasswordPage;
