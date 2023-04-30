import { FieldArrayRenderProps } from "formik";
import { Divider } from "primereact/divider";
import { FC, useState } from "react";
import { firstLetterToUpperCase } from "../helpers/firstLetterUpperCase";
import AddSectionForm from "./NewSectionForm/NewSectionForm";

type NewSectionTagProps = {
	arrayHelpers: FieldArrayRenderProps;
	index?: number;
	isContentEmpty?: boolean;
};
const NewSectionTag: FC<NewSectionTagProps> = ({
	arrayHelpers,
	index,
	isContentEmpty,
}) => {
	const [visible, toggleVisibility] = useState(false);

	const handleSubmit = (
		label: string,
		description: string,
		arrayHelpers: FieldArrayRenderProps
	) => {
		index
			? arrayHelpers.insert(index, {
					label: firstLetterToUpperCase(label),
					data: { description },
					children: [],
			  })
			: arrayHelpers.unshift({
					label: firstLetterToUpperCase(label),
					data: { description },
					children: [],
			  });

		toggleVisibility(false);
	};

	if (visible || isContentEmpty)
		return (
			<AddSectionForm
				toggleVisibility={toggleVisibility}
				onSubmit={(t, d) => handleSubmit(t, d, arrayHelpers)}
			/>
		);

	return (
		<Divider align="right">
			<div
				className="inline-flex align-items-center"
				onClick={(e) => {
					e.preventDefault();
					toggleVisibility(true);
				}}
			>
				<i className="pi pi-plus-circle mr-2"></i>
				<p>New</p>
			</div>
		</Divider>
	);
};

export default NewSectionTag;
