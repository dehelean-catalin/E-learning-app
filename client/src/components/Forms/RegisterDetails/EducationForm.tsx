import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { FC, FormEvent, useEffect, useState } from "react";
// import InputText from "../../common/InputText";

import style from "../NewForm.module.scss";
type Props = {
	activeIndex: number;
	onSelect: (e: any) => void;
};
const EducationForm: FC<Props> = ({ onSelect, activeIndex }) => {
	const userId = localStorage.getItem("userId");
	const [values, setValues] = useState({
		degree: "",
		institution: "",
		institutionKey: "",
		jobTitle: "",
	});
	const [degreeOptions, setDegreeOptions] = useState(null);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		axios
			.put(`http://localhost:4000/users/${userId}`)
			.then(() => onSelect(activeIndex + 1));
	};
	const itemTemplate = (options: any) => {
		return <div className={style.item}>{options.label}</div>;
	};
	useEffect(() => {
		// axios.get(`${baseRoute}/degrees.json`).then((res) => {
		// 	res.data.map((lala: any) => console.log(lala.name));
		// 	setDegreeOptions(res.data);
		// });
	}, []);
	return (
		<form onSubmit={handleSubmit}>
			<div>
				{/* <InputText>
					Degree
					<Dropdown
						className={style.dropdown}
						value={values.degree}
						onChange={(e) => setValues({ ...values, degree: e.target.value })}
						options={degreeOptions}
						filter={false}
						editable={true}
					/>
				</InputText>
				<InputText>
					Institution
					<Dropdown
						className={style.dropdown}
						panelClassName={style.panel}
						itemTemplate={itemTemplate}
						value={values.institution}
						onChange={(e) =>
							setValues({
								...values,
								institution: e.target.value,
							})
						}
						options={[
							{ label: "lala" },
							{ label: "lala" },
							{ label: "lala" },
							{ label: "lala" },
							{ label: "lala" },
							{ label: "lala" },
							{ label: "lala" },
							{ label: "lala" },
						]}
						filter={false}
					/>
				</InputText>
				<InputText>
					Institution key *
					<input
						value={values.institutionKey}
						onChange={(e) =>
							setValues({
								...values,
								institutionKey: e.target.value,
							})
						}
					/>
				</InputText>
				<InputText>
					Job title
					<input
						value={values.jobTitle}
						onChange={(e) => setValues({ ...values, jobTitle: e.target.value })}
					/>
				</InputText> */}
			</div>
			<div className={style.btns}>
				<button className={style.skip} onClick={() => onSelect(3)}>
					Finish
				</button>
				<button className={style.submit}>Next</button>
			</div>
		</form>
	);
};

export default EducationForm;
