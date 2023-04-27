import {
	Field,
	FieldArray,
	FieldArrayRenderProps,
	FieldInputProps,
} from "formik";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { FC } from "react";
import { PlanFieldModel } from "../../../../data/models/createdLecture.model";
import "./PlanLectureField.scss";

const PlanLectureField: FC<{
	data: FieldInputProps<PlanFieldModel[]>;
}> = ({ data }) => {
	const removeField = (
		e,
		arrayHelpers: FieldArrayRenderProps,
		index: number
	) => {
		e.stopPropagation();
		arrayHelpers.remove(index);
	};

	const addField = (arrayHelpers: FieldArrayRenderProps) => {
		arrayHelpers.push({
			value: "",
			placeholder: "Enter new line ...",
		});
	};

	return (
		<FieldArray
			name={data.name}
			render={(arrayHelpers) => (
				<>
					{data.value.map((planField, index) => (
						<div key={index} className="plan-lecture-field">
							<div className="wrapper">
								<Field
									name={`${data.name}.${index}.value`}
									placeholder={planField.placeholder}
									className={
										planField.value.length < 80
											? "border-1 border-transparent"
											: "border-1 border-red-400"
									}
								/>
								<span
									className={classNames({
										"text-red-400": planField.value.length >= 80,
										"field-length": true,
									})}
								>
									{planField.value.length}/80
								</span>
							</div>

							<Button
								type="button"
								icon="pi pi-trash"
								onClick={(e) => removeField(e, arrayHelpers, index)}
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
						onClick={() => addField(arrayHelpers)}
						disabled={
							!!data.value.find((i) => i.value === "" || i.value.length >= 80)
						}
					/>
				</>
			)}
		/>
	);
};

export default PlanLectureField;
