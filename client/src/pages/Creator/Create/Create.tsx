import { postCreateLecture } from "data/services/creator/_postCreateLecture.service";
import { useAxios } from "hooks/useAxios";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { useMutation } from "react-query";
import PRButton from "../../../components/Forms/Buttons/PRButton/PRButton";
import {
	Category,
	CreateLecturePayload,
	Language,
} from "../../../data/models/createdLecture.model";
import { AccountDataState } from "../../../data/redux/AccountReducer";
import { RootState } from "../../../data/redux/reducers";
import "./Create.scss";

const Create = () => {
	const axios = useAxios();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { displayName: author } = useSelector<RootState, AccountDataState>(
		(s) => s.accountReducer.data
	);

	const initialState: CreateLecturePayload = {
		title: "",
		language: Language.English,
		category: Category.ALL,
		author,
	};

	const [value, setValue] = useState(initialState);

	const disabled =
		!value.title.trim().length ||
		!value.category.length ||
		!value.language.length;

	const handleChange = (prop, e) => {
		setValue({ ...value, [`${prop}`]: e.target.value });
	};

	const { mutate: handleSubmit, isLoading } = useMutation((e: FormEvent) => {
		e.preventDefault();
		if (disabled) return;
		return postCreateLecture(axios, dispatch, navigate, value);
	});

	return (
		<div className="create-page">
			<form onSubmit={handleSubmit}>
				<h2 className="mb-3 text-3xl">Create your course</h2>
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
						If you're not sure which category fits best, you can change it
						later.
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

				<PRButton
					type="submit"
					className="submit-btn"
					// icon="pi pi-check"
					label="Create"
					disabled={disabled}
					loading={isLoading}
				/>
			</form>
		</div>
	);
};

export default Create;
