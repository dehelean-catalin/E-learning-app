import { FormEvent, useContext, useState } from "react";
import { useMutation } from "react-query";
import InputTextField from "../../../../components/Inputs/InputTextField/InputTextField";
import PRButton from "../../../../components/PRButton/PRButton";
import AuthContext from "../../../../data/context/auth-context";
import { postNewPassword } from "../../../../data/services/security.service";
import { useAxios } from "../../../../hooks/useAxios";

const ChangePasswordForm = () => {
	const axios = useAxios();
	const { providerId } = useContext(AuthContext);

	const [newEmail, setNewEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");

	const { mutate: handleSubmit } = useMutation(
		"postNewPassword",
		(e: FormEvent) => {
			e.preventDefault();
			return postNewPassword(axios, { newPassword: "", confirmPassword: "" });
		}
	);

	const disabled = false;

	if (providerId === "google.com") return;

	return (
		<div className="change-password">
			<h2 className="mb-2">Change email</h2>
			<form onSubmit={handleSubmit}>
				<InputTextField
					label="New email"
					value={newEmail}
					onChange={(e) => {
						setNewEmail(e);
					}}
					placeholder="Enter new email"
				/>
				<InputTextField
					label="Confirm email"
					value={confirmEmail}
					onChange={(e) => {
						setConfirmEmail(e);
					}}
					placeholder="Confirm new email"
				/>
				<div className="flex justify-content-end">
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
