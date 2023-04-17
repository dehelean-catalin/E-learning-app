import { FieldArrayRenderProps } from "formik";
import { Button } from "primereact/button";
import TreeNode from "primereact/treenode";
import { FC, useState } from "react";
import { useAxios } from "../../../../../../hooks/useAxios";
import ChildrenItem from "./ChildrenItem";
import LectureItemForm from "./LectureItemForm";
import "./UploadLectureItem.scss";

type Props = {
	index: number;
	arrayHelpers: FieldArrayRenderProps;
	children: TreeNode[];
};

export type LectureItemFormState = {
	label: string;
	description: string;
	content: any;
};

const UploadLectureItem: FC<Props> = ({ arrayHelpers, children, index }) => {
	const axios = useAxios();
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmit = async ({
		label,
		description,
		content,
	}: LectureItemFormState) => {
		const formData = new FormData();
		formData.append("file", content);

		await axios.post(`/content/${index}`, formData).then((res) => {
			arrayHelpers.push({
				label,
				data: {
					description,
					content: res.data,
				},
			});
		});
	};

	return (
		<div className="section-items">
			{children.map((children: TreeNode, index) => (
				<ChildrenItem
					key={index}
					index={index}
					data={children}
					arrayHelpers={arrayHelpers}
				/>
			))}
			{isOpen ? (
				<LectureItemForm toggleVisibility={setIsOpen} onSubmit={handleSubmit} />
			) : (
				<Button
					type="button"
					label="New"
					icon="pi pi-plus-circle"
					iconPos="left"
					onClick={() => setIsOpen(true)}
				/>
			)}
		</div>
	);
};

export default UploadLectureItem;
