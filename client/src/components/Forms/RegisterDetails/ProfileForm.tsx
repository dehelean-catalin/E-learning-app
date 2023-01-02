import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useAxios } from "../../../resources/axiosInstance";
import { UserDataModel } from "../../../resources/models/usersModel";
import { NotificationActions } from "../../../store/redux/notificationReducer";
import InputTextareaField from "../../common/InputTextareaField/InputTextareaField";
import InputTextField from "../../common/InputTextField/InputTextField";
import style from "../NewForm.module.scss";

export type StepProps = {
	activeIndex?: number;
	onSelect?: (e: any) => void;
};
const ProfileForm: FC<StepProps> = ({ onSelect, activeIndex }) => {
	const axiosInstance = useAxios();
	const dispatch = useDispatch();
	const [values, setValues] = useState<Partial<UserDataModel>>({
		phoneNumber: "",
		address: "",
		aboutYou: "",
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		axiosInstance.put("/user/data", values).then(() => {
			dispatch(
				NotificationActions.showBannerNotification({
					type: "info",
					message: "Registration successfuly",
				})
			);
			dispatch(
				NotificationActions.showBannerNotification({
					type: "info",
					message: "Registration successfuly",
				})
			);
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<InputTextField
					overlay="gray"
					label="Phone number"
					value={values.phoneNumber}
					onChange={(e) => setValues({ ...values, phoneNumber: e })}
					placeholder="ex: Strada Principala, nr 104 ..."
				/>
				<InputTextField
					overlay="gray"
					label="Address"
					value={values.address}
					onChange={(e) => setValues({ ...values, address: e })}
					placeholder="ex: Strada Principala, nr 104 ..."
				/>
				<InputTextareaField
					overlay="gray"
					label="About you"
					value={values.aboutYou}
					onChange={(e) => setValues({ ...values, aboutYou: e })}
					placeholder="Enter something about you"
				/>
			</div>
			<div className={style.btns}>
				{/* <button className={style.skip} onClick={() => onSelect(3)}>
					Skip all
				</button> */}
				<button className={style.submit}>Finish</button>
			</div>
		</form>
	);
};

export default ProfileForm;
