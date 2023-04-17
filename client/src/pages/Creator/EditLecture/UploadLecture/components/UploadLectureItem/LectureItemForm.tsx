import { Button } from "primereact/button";
import { FC, useState } from "react";
import { LectureItemFormState } from "./UploadLectureItem";

type Props = {
	onSubmit: any;
	toggleVisibility: (b: boolean) => void;
	index?: number;
};

const LectureItemForm: FC<Props> = ({ onSubmit, toggleVisibility, index }) => {
	const [inputValues, setInputValues] = useState<LectureItemFormState>({
		label: "",
		description: "",
		content: null,
	});

	return (
		<div className="new-section-form">
			<h3>{index ? `Edit lecture ${index + 1}` : "New lecture:"}</h3>
			<fieldset>
				<label htmlFor="title">Lecture title</label>

				<input
					name="title"
					value={inputValues.label}
					placeholder="Enter the title"
					onChange={(e) =>
						setInputValues({ ...inputValues, label: e.target.value })
					}
					autoFocus
				/>
				<label htmlFor="description">
					What will students be able to do at the end of this section?
				</label>

				<input
					name="description"
					value={inputValues.description}
					placeholder="Enter the description"
					onChange={(e) =>
						setInputValues({
							...inputValues,
							description: e.target.value,
						})
					}
				/>

				<label htmlFor="file">Upload the content</label>

				<input
					name="file"
					type="file"
					accept="video/*"
					onChange={(e) =>
						setInputValues({
							...inputValues,
							content: e.target.files[0],
						})
					}
				/>

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
						onClick={() => {
							onSubmit(inputValues, inputValues);
							toggleVisibility(false);
						}}
					/>
				</div>
			</fieldset>
		</div>
	);
};

export default LectureItemForm;
