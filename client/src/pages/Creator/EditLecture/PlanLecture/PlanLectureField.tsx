import {
	Field,
	FieldArray,
	FieldArrayRenderProps,
	FieldInputProps,
} from "formik";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { FC } from "react";
import "./PlanLectureField.scss";

const PlanLectureField: FC<{
	data: FieldInputProps<string[]>;
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
		arrayHelpers.push("");
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
									name={`${data.name}.${index}`}
									placeholder={"Add new lecture goal"}
									className={
										planField.length < 160
											? "border-1 border-transparent"
											: "border-1 border-red-400"
									}
								/>
								<span
									className={classNames({
										"text-red-400": planField.length >= 160,
										"field-length": true,
									})}
								>
									{planField.length}/160
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
						disabled={!!data.value.find((i) => i === "" || i.length >= 160)}
					/>
				</>
			)}
		/>
	);
};

export default PlanLectureField;
