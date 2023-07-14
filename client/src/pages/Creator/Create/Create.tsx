import { AxiosError } from "axios";
import { useAxios } from "data/hooks/useAxios";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PRButton from "../../../components/PRButton/PRButton";
import { Category, LanguageEnum } from "../../../data/models/creatorModel";
import { AccountDataState } from "../../../data/redux/accountReducer";
import { NotificationActions } from "../../../data/redux/notificationReducer";
import { RootState } from "../../../data/redux/store";
import { postCreateLecture } from "../../../data/services/creatorService";
import "./Create.scss";

const Create = () => {
	const axios = useAxios();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { displayName: author } = useSelector<RootState, AccountDataState>(
		(s) => s.accountReducer.data
	);

	const initialState = {
		title: "",
		language: LanguageEnum.English,
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

	const { mutate: handleSubmit, isLoading } = useMutation(
		(e: FormEvent) => {
			e.preventDefault();
			if (disabled) return;
			return postCreateLecture(axios, value);
		},
		{
			onSuccess: (res) => {
				dispatch(
					NotificationActions.showBannerNotification({
						message: res,
						type: "info",
					})
				);
				navigate("/creator/dashboard", { replace: true });
			},
			onError: (err: AxiosError<{ message: string }>) => {
				dispatch(
					NotificationActions.showBannerNotification({
						message: err.response.data.message,
						type: "warning",
					})
				);
			},
		}
	);

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
						options={Object.values(LanguageEnum)}
						placeholder={"Chose a language"}
					></Dropdown>
				</div>

				<PRButton
					type="submit"
					icon="pi pi-check"
					className="w-full"
					label="Create"
					disabled={disabled}
					loading={isLoading}
				/>
			</form>
		</div>
	);
};

export default Create;
