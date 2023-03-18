import { GenericButton } from "components/Forms";
import { useState } from "react";
import InputPasswordField from "../../../components/Forms/Inputs/InputPasswordField/InputPasswordField";
import {
	errorMessageSchema,
	passwordReggex,
} from "../../../helper/inputPasswordHelper";
import { useAxios } from "../../../hooks/useAxios";
import styles from "./ChangePassword.module.scss";

const ChangePassword = () => {
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
		<div className={styles["change-password"]}>
			<div className={styles.title}>Change password</div>
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
					<GenericButton disabled={disabled}>Change password</GenericButton>
				</div>
			</form>
		</div>
	);
};

export default ChangePassword;
