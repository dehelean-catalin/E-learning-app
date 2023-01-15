import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputTextareaField from "../../common/InputTextareaField/InputTextareaField";
import InputTextField from "../../common/InputTextField/InputTextField";
import { useAxios } from "../../config/axiosInstance";
import { UserDataModel } from "../../data/models/usersModel";
import { NotificationActions } from "../../data/redux/notificationReducer";
import { RootState } from "../../data/redux/reducers";
import {
	UserDataActions,
	UserDataState,
} from "../../data/redux/userDataReducer";
import styles from "./AccountData.module.scss";

const AccountSection = () => {
	const dispatch = useDispatch();
	const axiosInstance = useAxios();
	const userData = useSelector<RootState, UserDataState>(
		(s) => s.userDataReducer.data
	);
	const [values, setValues] = useState<UserDataModel>();

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
		axiosInstance
			.put("/user/data", values)
			.then((res) => {
				axiosInstance
					.get<UserDataModel>("/user/data")
					.then((res) => {
						dispatch(UserDataActions.setUserData(res.data));
					})
					.catch(() => {
						dispatch(
							NotificationActions.showBannerNotification({
								type: "warning",
								message: "Something went wrong",
							})
						);
					});
				dispatch(
					NotificationActions.showBannerNotification({
						type: "info",
						message: res.data,
					})
				);
			})
			.catch(() => {
				dispatch(
					NotificationActions.showBannerNotification({
						type: "warning",
						message: "Something went wrong",
					})
				);
			});
	};
	return (
		<>
			<h1> Basic information</h1>
			{values && (
				<form onSubmit={handleSubmit}>
					<div>
						<InputTextField
							label="First name"
							value={values?.firstName}
							onChange={(e) => setValues({ ...values, firstName: e })}
							onBlur={() => setIsTouched({ ...isTouched, firstName: true })}
							hasError={!values.firstName.length && isTouched.firstName}
							errorMessage={"First name is required"}
						/>

						<InputTextField
							label="Last name"
							value={values?.lastName}
							onChange={(e) => setValues({ ...values, lastName: e })}
							onBlur={() => setIsTouched({ ...isTouched, lastName: true })}
							hasError={!values.lastName.length && isTouched.lastName}
							errorMessage={"Last name is required"}
						/>

						<InputTextField
							label="Phone number"
							value={values?.phoneNumber}
							onChange={(e) => setValues({ ...values, phoneNumber: e })}
							onBlur={() => setIsTouched({ ...isTouched, phoneNumber: true })}
							hasError={!values.phoneNumber?.length && isTouched.phoneNumber}
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
		</>
	);
};

export default AccountSection;
