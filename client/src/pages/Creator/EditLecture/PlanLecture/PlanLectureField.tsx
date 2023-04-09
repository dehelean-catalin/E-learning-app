import { FieldArray, FieldInputProps } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FC } from "react";
import { PlanFieldModel } from "../../../../data/models/creator/createdLectures.model";

const PlanLectureField: FC<{
	data: FieldInputProps<PlanFieldModel[]>;
}> = ({ data }) => {
	return (
		<FieldArray
			name={data.name}
			render={(arrayHelpers) => (
				<div>
					{data.value.map((friend, index) => (
						<div key={index}>
							<InputText
								name={`${data.name}.[${index}].value`}
								placeholder={friend.placeholder}
								onChange={data.onChange}
							/>
							<Button
								type="button"
								icon="pi pi-trash"
								onClick={() => arrayHelpers.remove(index)}
								disabled={data.value.length < 4}
							/>
						</div>
					))}
					<Button
						type="button"
						label="Add more answers"
						icon="pi pi-plus-circle"
						className="w-5"
						iconPos="left"
						onClick={() =>
							arrayHelpers.push({ value: "", placeholder: "test" })
						}
						disabled={!!data.value.find((i) => i.value === "")}
					/>
				</div>
			)}
		/>
	);
};

export default PlanLectureField;
