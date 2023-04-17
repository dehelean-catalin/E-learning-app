import { FieldArrayRenderProps } from "formik";
import { Divider } from "primereact/divider";
import { FC, useState } from "react";
import AddSectionForm from "./AddSectionForm/AddSectionForm";

const SectionDivider: FC<{
	arrayHelpers: FieldArrayRenderProps;
	index?: number;
	isContentEmpty?: boolean;
}> = ({ arrayHelpers, index, isContentEmpty }) => {
	const [visible, toggleVisibility] = useState(false);

	const handleSubmit = (
		label: string,
		data: string,
		arrayHelpers: FieldArrayRenderProps
	) => {
		index
			? arrayHelpers.insert(index, {
					label,
					data,
					children: [],
			  })
			: arrayHelpers.unshift({
					label,
					data,
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

export default SectionDivider;
