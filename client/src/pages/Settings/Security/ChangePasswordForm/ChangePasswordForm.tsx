import { FormEvent, useContext, useState } from "react";
import { useMutation } from "react-query";
import InputPasswordField from "../../../../components/Forms/Inputs/PRPassword/InputPasswordField";
import PRButton from "../../../../components/PRButton/PRButton";
import AuthContext from "../../../../data/context/auth-context";
import { postNewPassword } from "../../../../data/services/security.service";
import { useAxios } from "../../../../hooks/useAxios";
import styles from "./ChangePassword.module.scss";

const ChangePasswordForm = () => {
	const axios = useAxios();
	const { providerId } = useContext(AuthContext);

	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { mutate: handleSubmit } = useMutation(
		"postNewPassword",
		(e: FormEvent) => {
			e.preventDefault();
			return postNewPassword(axios, { newPassword, confirmPassword });
		}
	);

	const disabled =
		!newPassword.trim().length ||
		!confirmPassword.trim().length ||
		confirmPassword !== newPassword;

	if (providerId === "google.com") return;

	return (
		<div className="mb-2">
			<h3 className="mb-2">Change password</h3>
			<form onSubmit={handleSubmit}>
				<InputPasswordField
					label="New password"
					value={newPassword}
					onChange={(e) => {
						setNewPassword(e.target.value);
					}}
					feedback={true}
				/>
				<InputPasswordField
					label="Confirm password"
					value={confirmPassword}
					onChange={(e) => {
						setConfirmPassword(e.target.value);
					}}
				/>
				<div className={styles.btns}>
					<PRButton
						type="submit"
						label="Confirm"
						icon="pi pi-check"
						disabled={disabled}
					/>
				</div>
			</form>
		</div>
	);
};

export default ChangePasswordForm;
