import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputTextareaField from "../../../common/InputTextareaField/InputTextareaField";
import InputTextField from "../../../common/InputTextField/InputTextField";
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
		firstName: false,
		lastName: false,
		phoneNumber: false,
	});
	const disabled =
		!values?.firstName.length ||
		!values?.lastName.length ||
		!values?.phoneNumber.length;
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (disabled) {
			return;
		}
		dispatch(AccountDataActions.setAccountDataRequest(values));
		// axiosInstance
		// 	.put("/user/data", values)
		// 	.then((res) => {
		// 		axiosInstance
		// 			.get<AccountDataState>("/user/data")
		// 			.then((res) => {
		// 				dispatch(AccountDataActions.getAccountDataSuccess(res.data));
		// 			})
		// 			.catch(() => {
		// 				dispatch(
		// 					NotificationActions.showBannerNotification({
		// 						type: "warning",
		// 						message: "Something went wrong",
		// 					})
		// 				);
		// 			});
		// 		dispatch(
		// 			NotificationActions.showBannerNotification({
		// 				type: "info",
		// 				message: res.data,
		// 			})
		// 		);
		// 	})
		// 	.catch(() => {
		// 		dispatch(
		// 			NotificationActions.showBannerNotification({
		// 				type: "warning",
		// 				message: "Something went wrong",
		// 			})
		// 		);
		// 	});
	};
	return (
		<div className={styles["account-section"]}>
			<h1> Basic information</h1>
			{values && (
				<form onSubmit={handleSubmit}>
					<div>
						<InputTextField
							label="First name"
							value={values?.firstName}
							onChange={(e) => setValues({ ...values, firstName: e })}
							onBlur={() => setIsTouched({ ...isTouched, firstName: true })}
							errorMessage={"First name is required"}
						/>

						<InputTextField
							label="Last name"
							value={values?.lastName}
							onChange={(e) => setValues({ ...values, lastName: e })}
							onBlur={() => setIsTouched({ ...isTouched, lastName: true })}
							errorMessage={"Last name is required"}
						/>

						<InputTextField
							label="Phone number"
							value={values?.phoneNumber}
							onChange={(e) => setValues({ ...values, phoneNumber: e })}
							onBlur={() => setIsTouched({ ...isTouched, phoneNumber: true })}
							errorMessage={"Phone number is required"}
						/>
						<InputTextField
							label="Address"
							value={values?.address}
							onChange={(e) => setValues({ ...values, address: e })}
						/>
						<InputTextareaField
							label="About you"
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
