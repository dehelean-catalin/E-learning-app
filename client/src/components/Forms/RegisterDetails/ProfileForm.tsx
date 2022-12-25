import { FC, FormEvent, useState } from "react";
import { useProfileDetails } from "../../../hooks/useProfileDetails";
import { UserDetails } from "../../../resources/models/models";
// import InputText from "../../common/InputText";
import style from "../NewForm.module.scss";

export type StepProps = {
	activeIndex?: number;
	onSelect?: (e: any) => void;
};
const ProfileForm: FC<StepProps> = ({ onSelect, activeIndex }) => {
	const { loading, sendRequest } = useProfileDetails();
	const [profilePicure, setProfilePicture] = useState<File>(null);
	const [values, setValues] = useState<UserDetails>({
		phone: "",
		address: "",
		aboutYou: "",
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		sendRequest(values, onSelect, activeIndex, profilePicure);
	};
	const getButton = () => {
		if (loading) {
			return <>loading ...</>;
		}
		return <button className={style.submit}>Next</button>;
	};
	return (
		<form onSubmit={handleSubmit}>
			<div>
				{/* <InputText>
					Profile picture
					<input
						type={"file"}
						name="image"
						onChange={(e) => setProfilePicture(e.target.files[0])}
					></input>
				</InputText>
				<InputText>
					Phone number
					<input
						type={"text"}
						className={style["phone-input"]}
						value={values.phone}
						onChange={(e) => setValues({ ...values, phone: e.target.value })}
						placeholder={"ex: 123456 ..."}
						maxLength={10}
					/>
				</InputText>
				<InputText>
					Address
					<input
						value={values.address}
						onChange={(e) => setValues({ ...values, address: e.target.value })}
						placeholder="ex: Strada Principala, nr 104 ..."
					/>
				</InputText>
				<InputText>
					About you
					<textarea
						value={values.aboutYou}
						onChange={(e) => setValues({ ...values, aboutYou: e.target.value })}
						placeholder="Add a few words that best describe you ..."
						rows={+"3"}
						maxLength={300}
					/>
				</InputText> */}
			</div>
			<div className={style.btns}>
				<button className={style.skip} onClick={() => onSelect(3)}>
					Skip all
				</button>
				{getButton()}
			</div>
		</form>
	);
};

export default ProfileForm;
