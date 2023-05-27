import { useState } from "react";
import style from "../NewForm.module.scss";
import EducationForm from "./EducationForm";
import ProfileForm from "./ProfileForm";
import SettingsForm from "./SettingsForm";
import SuccesMessage from "./SuccesMessage";

const RegisterDetailsForm = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const getCurrentPage = () => {
		if (activeIndex === 1) {
			return (
				<EducationForm
					activeIndex={activeIndex}
					onSelect={(e: any) => setActiveIndex(e)}
				/>
			);
		}
		if (activeIndex === 2) {
			return (
				<SettingsForm
					activeIndex={activeIndex}
					onSelect={(e: any) => setActiveIndex(e)}
				/>
			);
		}
		if (activeIndex === 3) {
			return <SuccesMessage />;
		}
		return (
			<ProfileForm
				activeIndex={activeIndex}
				onSelect={(e: any) => setActiveIndex(e)}
			/>
		);
	};
	return (
		<>
			<div className={style.form}>
				<div className={style.title}>Account</div>
				{/* <Steps activeIndex={activeIndex} /> */}

				{getCurrentPage()}
			</div>
		</>
	);
};

export default RegisterDetailsForm;
