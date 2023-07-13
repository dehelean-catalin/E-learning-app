import Spinner from "components/Spinner/Spinner";
import { ContentData } from "data/models/creatorModel";
import { FieldArrayRenderProps } from "formik";
import { generateRandomId } from "helpers";
import { useAxios } from "hooks/useAxios";
import { Button } from "primereact/button";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router";
import { firstLetterToUpperCase } from "../../helpers/firstLetterUpperCase";
import ChildrenItem from "./ChildrenItem";
import LectureItemForm from "./LectureItemForm";
import "./UploadLectureItem.scss";

type Props = {
	index: number;
	arrayHelpers: FieldArrayRenderProps;
	children: {
		label: string;
		data: ContentData;
	}[];
};

export type LectureItemFormState = {
	label: string;
	description: string;
	content?: any;
	duration?: number;
	type?: string;
};

const UploadLectureItem: FC<Props> = ({ arrayHelpers, children, index }) => {
	const axios = useAxios();
	const [isOpen, setIsOpen] = useState(false);
	const { id } = useParams();

	const { mutate, isLoading } = useMutation(
		({ label, description, content, duration, type }: LectureItemFormState) => {
			return axios
				.post<{ content: string; track: string }>(`/content/${id}`, content)
				.then((res) =>
					arrayHelpers.push({
						label: firstLetterToUpperCase(label),
						data: {
							id: generateRandomId(5),
							description,
							content: res.data.content,
							track: res.data.track,
							duration,
							status: "Success",
							date: new Date().toISOString(),
							type,
						},
					})
				);
		}
	);

	return (
		<div className="section-items">
			{children.map((value, subIndex) => (
				<ChildrenItem
					key={subIndex}
					subIndex={subIndex}
					index={index}
					value={value}
					arrayHelpers={arrayHelpers}
				/>
			))}

			{isLoading && <Spinner className="h-2rem mx-auto my-2 w-full" />}

			{isOpen ? (
				<LectureItemForm toggleVisibility={setIsOpen} onSubmit={mutate} />
			) : (
				<Button
					type="button"
					className="py-2 px-3"
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
