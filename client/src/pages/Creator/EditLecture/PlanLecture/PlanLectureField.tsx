import { Field, FieldArray, FieldInputProps } from "formik";
import { Button } from "primereact/button";
import { FC } from "react";
import { PlanFieldModel } from "../../../../data/models/createdLecture.model";
import "./PlanLectureField.scss";

const PlanLectureField: FC<{
	data: FieldInputProps<PlanFieldModel[]>;
}> = ({ data }) => {
	return (
		<FieldArray
			name={data.name}
			render={(arrayHelpers) => (
				<div>
					{data.value.map((friend, index) => (
						<div key={index} className="plan-lecture-field">
							<Field
								name={`${data.name}.${index}.value`}
								placeholder={friend.placeholder}
								onChange={data.onChange}
							/>
							<Button
								type="button"
								icon="pi pi-trash"
								onClick={(e) => {
									e.stopPropagation();
									arrayHelpers.remove(index);
								}}
								disabled={data.value.length < 4}
							/>
						</div>
					))}
					<Button
						type="button"
						label="Add more answers"
						icon="pi pi-plus-circle"
						className="add-button"
						iconPos="left"
						onClick={() =>
							arrayHelpers.push({
								value: "",
								placeholder: "Enter new line ...",
							})
						}
						disabled={!!data.value.find((i) => i.value === "")}
					/>
				</div>
			)}
		/>
	);
};

export default PlanLectureField;
