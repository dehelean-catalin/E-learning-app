import { FC, FormEvent, useState } from "react";
// import { useProfileDetails } from "../../../hooks/useProfileDetails";
import style from "../NewForm.module.scss";
import { StepProps } from "./ProfileForm";

const SettingsForm: FC<StepProps> = ({ onSelect }) => {
	// const { sendRequest } = useProfileDetails();
	const [values, setValues] = useState({
		favoriteTopics: "",
		links: "",
	});
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// sendRequest(values, onSelect, activeIndex);
	};
	const isActive = !!values.favoriteTopics || !!values.links;

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<div className={style.field}>
					Favorite topics
					<input
						value={values.favoriteTopics}
						onChange={(e) =>
							setValues({
								...values,
								favoriteTopics: e.target.value,
							})
						}
					/>
				</div>
				<div className={style.field}>
					Links
					<input
						value={values.links}
						onChange={(e) => setValues({ ...values, links: e.target.value })}
					/>
				</div>
			</div>
			<div className={style.btns}>
				<button className={style.skip} onClick={() => onSelect(3)}>
					Finish
				</button>
				<button className={style.submit} disabled={!isActive}>
					Next
				</button>
			</div>
		</form>
	);
};

export default SettingsForm;
