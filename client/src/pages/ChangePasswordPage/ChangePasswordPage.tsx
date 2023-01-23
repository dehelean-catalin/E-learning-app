import { useState } from "react";
import Button from "../../common/Button/Button";
import InputPasswordField from "../../common/InputPasswordField/InputPasswordField";
import { useAxios } from "../../config/axiosInstance";
import styles from "./ChangePasswordPage.module.scss";

const ChangePasswordPage = () => {
	const axiosInstance = useAxios();
	const [password, setPassword] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance.post("/change-password", { newPassword: password });
	};
	return (
		<div className={styles["security-page"]}>
			<form onSubmit={handleSubmit}>
				<InputPasswordField
					label="Old password"
					value={password}
					onChange={(e) => {
						setPassword(e);
					}}
				/>
				<InputPasswordField
					label="New password"
					value={password}
					onChange={(e) => {
						setPassword(e);
					}}
				/>
				<InputPasswordField
					label="Confirm new password"
					value={password}
					onChange={(e) => {
						setPassword(e);
					}}
				/>
				<div className={styles.btns}>
					<Button disabled={!!!password.length}>Change password</Button>
				</div>
			</form>
		</div>
	);
};

export default ChangePasswordPage;
