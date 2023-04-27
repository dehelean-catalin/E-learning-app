import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { FC, KeyboardEvent, useState } from "react";
import { LectureItemFormState } from "./UploadLectureItem";

type Props = {
	onSubmit: (data: LectureItemFormState) => void;
	toggleVisibility: (b: boolean) => void;
	index?: number;
};

type InputState = Omit<LectureItemFormState, "type">;

const LectureItemForm: FC<Props> = ({ onSubmit, toggleVisibility, index }) => {
	const formData = new FormData();

	const [touched, setTouched] = useState({
		label: false,
		content: false,
	});

	const [inputValues, setInputValues] = useState<InputState>({
		label: "",
		description: "",
	});

	const disabled = !inputValues.label.trim().length || !inputValues?.content;

	const handleEnterPress = (e: KeyboardEvent<HTMLDivElement>) => {
		if (!inputValues?.content) return;
		formData.append("file", inputValues?.content);
		if (e.code === "Enter") {
			onSubmit({
				...inputValues,
				content: formData,
				type: inputValues.content.type,
			});
			toggleVisibility(false);
		}
	};

	const handleChange = (e, prop: keyof LectureItemFormState) => {
		setInputValues({ ...inputValues, [prop]: e.target.value });
	};

	const handleSubmit = () => {
		if (!inputValues?.content) return;
		formData.append("file", inputValues?.content);

		onSubmit({
			...inputValues,
			content: formData,
			type: inputValues.content.type,
		});
		toggleVisibility(false);
	};

	return (
		<div className="new-section-form" onKeyDown={handleEnterPress}>
			<h3>{index ? `Edit lecture ${index + 1}` : "New lecture:"}</h3>
			<fieldset>
				<label htmlFor="title">Lecture title</label>

				<input
					name="title"
					className={classNames({
						"border-red-400": touched.label && !inputValues.label.trim().length,
					})}
					value={inputValues.label}
					placeholder="Enter the title"
					onChange={(e) => handleChange(e, "label")}
					autoFocus
					onBlur={() => setTouched({ ...touched, label: true })}
				/>
				{touched.label && !inputValues.label.trim().length && (
					<span className="text-red-400 text-xs">Required*</span>
				)}
				<label htmlFor="description">
					What will students be able to do at the end of this section?
				</label>

				<input
					name="description"
					value={inputValues.description}
					placeholder="Enter the description"
					onChange={(e) => handleChange(e, "description")}
				/>

				<label htmlFor="file">Upload the content</label>

				<input
					className={classNames({
						"border-red-400 text-red-400":
							touched.content && !inputValues?.content?.type.includes("video"),
					})}
					name="file"
					type="file"
					accept="video/*"
					onChange={(e) => {
						setInputValues({
							...inputValues,
							content: e.target.files[0],
						});
						setTouched({ ...touched, content: true });
					}}
				/>
				{touched.content && !inputValues?.content?.type.includes("video") && (
					<p className="text-red-400 text-xs">Invalid format</p>
				)}

				<div className="flex justify-content-end gap-2 mt-2">
					<Button
						type="button"
						label="Cancel"
						className="cancel"
						onClick={() => toggleVisibility(false)}
					/>
					<Button
						type="button"
						label="Save"
						onClick={handleSubmit}
						disabled={disabled}
					/>
				</div>
			</fieldset>
		</div>
	);
};

export default LectureItemForm;
