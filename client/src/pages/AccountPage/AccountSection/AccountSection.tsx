import { getGenericErrorMessage } from "helpers/formHelpers";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputTextField from "../../../components/Forms/Inputs/InputTextField/InputTextField";
import InputTextareaField from "../../../components/Forms/Inputs/InputTextareaField/InputTextareaField";
import {
	AccountDataActions,
	AccountDataState,
} from "../../../data/redux/account/AccountReducer";
import { RootState } from "../../../data/redux/reducers";
import styles from "./AccountSection.module.scss";

const AccountSection = () => {
	const dispatch = useDispatch();
	const userData = useSelector<RootState, AccountDataState>(
		(s) => s.accountReducer.data
	);
	const [values, setValues] = useState<AccountDataState>();

	useEffect(() => {
		setValues(userData);
	}, [userData]);

	const [isTouched, setIsTouched] = useState({
		displayName: false,
		phoneNumber: false,
	});

	const disabled = !values?.displayName.length || !values?.phoneNumber.length;

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (disabled) {
			return;
		}
		dispatch(AccountDataActions.setAccountDataRequest(values));
	};

	return (
		<div className={styles["account-section"]}>
			<h1> Basic information</h1>
			{values && (
				<form onSubmit={handleSubmit}>
					<div>
						<InputTextField
							label="Display name"
							value={values?.displayName}
							placeholder="Enter display name"
							onChange={(e) => setValues({ ...values, displayName: e })}
							onBlur={() => setIsTouched({ ...isTouched, displayName: true })}
							errorMessage={getGenericErrorMessage(
								values.displayName,
								isTouched.displayName,
								"First name is required"
							)}
						/>

						<InputTextField
							label="Phone number"
							value={values?.phoneNumber}
							placeholder="Enter phone number"
							onChange={(e) => setValues({ ...values, phoneNumber: e })}
							onBlur={() => setIsTouched({ ...isTouched, phoneNumber: true })}
							errorMessage={getGenericErrorMessage(
								values.phoneNumber,
								isTouched.phoneNumber,
								"Phone number is required"
							)}
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
						<button disabled={disabled}>Save</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default AccountSection;
