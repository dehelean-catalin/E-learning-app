import { ProgressSpinner } from "primereact/progressspinner";
import { useState, useEffect, FormEvent, useContext } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/common/Button/Button";
import { Axios } from "../../resources/routes";
import AuthContext from "../../store/context/auth-context";
import { NotificationActions } from "../../store/redux/notificationReducer";
import styles from "./AccountData.module.scss";
import InputTextField from "../../components/common/InputTextField/InputTextField";
import { BannerNotificationType } from "../../resources/models/models";
import InputTextareaField from "../../components/common/InputTextareaField/InputTextareaField";

const Account = () => {
	const dispatch = useDispatch();
	const { token } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		address: "",
		aboutYou: "",
	});
	const [isTouched, setIsTouched] = useState({
		firstName: false,
		lastName: false,
		phoneNumber: false,
	});
	const disabled =
		!values.firstName.length ||
		!values.lastName.length ||
		!values.phoneNumber.length;

	useEffect(() => {
		Axios.get("/user-details", {
			headers: {
				authorization: "Bearer " + token,
			},
		})
			.then((res) => setValues(res.data))
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	}, []);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (disabled) {
			return;
		}
		Axios.put("/user-details", values, {
			headers: {
				authorization: "Bearer " + token,
			},
		})
			.then((res) =>
				dispatch(
					NotificationActions.showBannerNotification({
						type: BannerNotificationType.Info,
						message: res.data,
					})
				)
			)
			.catch((err) => {
				dispatch(
					NotificationActions.showBannerNotification({
						type: BannerNotificationType.Warning,
						message: "Something went wrong",
					})
				);
			});
	};

	// if (isLoading) {
	// 	return <ProgressSpinner className={styles.loading} />;
	// }
	return (
		<div className={styles["settings-content"]}>
			<header>Account</header>
			<h1> Basic information</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<InputTextField
						label="First name"
						value={values.firstName}
						onChange={(e) => setValues({ ...values, firstName: e })}
						onBlur={() => setIsTouched({ ...isTouched, firstName: true })}
						hasError={!values.firstName.length && isTouched.firstName}
						errorMessage={"First name is required"}
					/>
					<InputTextField
						label="Last name"
						value={values.lastName}
						onChange={(e) => setValues({ ...values, lastName: e })}
						onBlur={() => setIsTouched({ ...isTouched, lastName: true })}
						hasError={!values.lastName.length && isTouched.lastName}
						errorMessage={"Last name is required"}
					/>

					<InputTextField
						label="Phone number"
						value={values.phoneNumber}
						onChange={(e) => setValues({ ...values, phoneNumber: e })}
						onBlur={() => setIsTouched({ ...isTouched, phoneNumber: true })}
						hasError={!values.phoneNumber.length && isTouched.phoneNumber}
						errorMessage={"Phone number is required"}
					/>
					<InputTextField
						label="Address"
						value={values.address}
						onChange={(e) => setValues({ ...values, address: e })}
					/>
					<InputTextareaField
						label="About you"
						value={values.aboutYou}
						onChange={(e) => setValues({ ...values, aboutYou: e })}
					/>
				</div>
				<div className={styles.btns}>
					<Button disabled={disabled}>Save</Button>
				</div>
			</form>
		</div>
	);
};

export default Account;
