import { getGenericErrorMessage } from "data/helpers/formHelpers";
import { isEqual } from "lodash";
import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import InputTextField from "../../../../components/Inputs/InputTextField/InputTextField";
import InputTextareaField from "../../../../components/Inputs/InputTextareaField/InputTextareaField";
import PRButton from "../../../../components/PRButton/PRButton";
import { useAxios } from "../../../../data/hooks/useAxios";
import { AccountDataState } from "../../../../data/redux/accountReducer";
import { RootState } from "../../../../data/redux/store";
import styles from "./AccountSection.module.scss";

const AccountSection = () => {
	const axios = useAxios();
	const data = useSelector<RootState, AccountDataState>(
		(s) => s.accountReducer.data
	);
	const { displayName, aboutYou, address, phoneNumber } = data;

	const initialValues = {
		displayName,
		aboutYou,
		address,
		phoneNumber,
	};
	const [values, setValues] =
		useState<Omit<AccountDataState, "email" | "profilePicture">>();

	useEffect(() => {
		setValues({ displayName, aboutYou, address, phoneNumber });
	}, [data]);

	const queryClient = useQueryClient();
	const [isTouched, setIsTouched] = useState(false);

	const disabled =
		!values?.displayName.trim().length || isEqual(initialValues, values);

	const { mutate: handleSubmit, isLoading } = useMutation(
		"putProfileData",
		(e: FormEvent) => {
			e.preventDefault();
			if (disabled) return;

			return axios.put("/account", values);
		},
		{ onSuccess: () => queryClient.invalidateQueries("getProfileData") }
	);

	return (
		<div className={styles["account-section"]}>
			<h1>Basic information</h1>
			{values && (
				<form onSubmit={handleSubmit}>
					<div>
						<InputTextField
							label="Display name"
							value={values?.displayName}
							placeholder="Enter display name"
							onChange={(e) => setValues({ ...values, displayName: e })}
							onBlur={() => setIsTouched(true)}
							errorMessage={getGenericErrorMessage(
								values.displayName,
								isTouched,
								"First name is required"
							)}
						/>
						<InputTextField
							label="Phone number"
							value={values?.phoneNumber}
							placeholder="Enter phone number"
							onChange={(e) => setValues({ ...values, phoneNumber: e })}
						/>
						<InputTextField
							label="Address"
							placeholder="Enter address"
							value={values?.address}
							onChange={(e) => setValues({ ...values, address: e })}
						/>
						<InputTextareaField
							label="About you"
							placeholder="Enter something about you"
							value={values?.aboutYou}
							onChange={(e) => setValues({ ...values, aboutYou: e })}
						/>
					</div>
					<div className={styles.btns}>
						<PRButton
							type="submit"
							label="Confirm"
							icon="pi pi-check"
							loading={isLoading}
							disabled={disabled}
						/>
					</div>
				</form>
			)}
		</div>
	);
};

export default AccountSection;
