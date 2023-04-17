import { SubmitButton } from "components/Forms";

import { postCreateLecture } from "data/services/creator/_postCreateLecture.service";
import { useAxios } from "hooks/useAxios";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import {
	Category,
	CreateLecturePayload,
	Language,
} from "../../../data/models/createdLecture.model";
import "./Create.scss";

const initialState = {
	title: "",
	language: "",
	category: Category.None,
};

const Create = () => {
	const axios = useAxios();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [value, setValue] = useState<CreateLecturePayload>(initialState);

	const disabled =
		!value.title.length || !value.category.length || !value.language.length;

	const handleChange = (prop, e) => {
		setValue({ ...value, [`${prop}`]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!disabled) postCreateLecture(axios, dispatch, navigate, value);

		setValue(initialState);
	};

	return (
		<form className="create-page" onSubmit={handleSubmit}>
			<h1>Create your course</h1>
			<div className="field">
				<h3>Do you give it a provisional title?</h3>
				<span>
					It's okay if you don't have inspiration right now for a good title.
					You can change it later.
				</span>

				<InputText
					value={value.title}
					onChange={(e) => handleChange("title", e)}
					placeholder="ex: Learn React in 60 days ..."
				></InputText>
			</div>
			<div className="field">
				<h3>Which category best matches the knowledge you will share?</h3>
				<span>
					If you're not sure which category fits best, you can change it later.
				</span>
				<Dropdown
					value={value.category}
					onChange={(e) => handleChange("category", e)}
					options={Object.values(Category)}
					placeholder={"Chose a category"}
				></Dropdown>
			</div>

			<div className="field">
				<h3>In which language will the course content be presented?</h3>
				<Dropdown
					value={value.language}
					onChange={(e) => handleChange("language", e)}
					options={Object.values(Language)}
					placeholder={"Chose a language"}
				></Dropdown>
			</div>

			<SubmitButton label="Create" disabled={disabled} />
		</form>
	);
};

export default Create;
