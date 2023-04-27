import { Field, FieldArray, FieldArrayRenderProps } from "formik";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { FC, useState } from "react";
import { Content } from "../../../../../../data/models/createdLecture.model";
import useDragAndDropContent from "../../hooks/useUploadContent";
import UploadLectureItem from "../UploadLectureItem/UploadLectureItem";
import UploadLectureDivider from "./SectionDivider";
import "./UploadLectureSection.scss";

type Props = {
	index: number;
	content: Content;
	arrayHelpers: FieldArrayRenderProps;
};

const UploadLectureSection: FC<Props> = ({ index, arrayHelpers, content }) => {
	const [isOpen, setIsOpen] = useState(true);
	const [openEditMode, setOpenEditMode] = useState(false);

	const {
		handleDragStart,
		handleDragEnd,
		handleDragLeave,
		handleDragOver,
		handleDrop,
	} = useDragAndDropContent();

	if (openEditMode)
		return (
			<div className="new-section-form">
				<h3>{index ? `Edit section ${index + 1}` : "New section:"}</h3>
				<fieldset>
					<label htmlFor="title">Section title</label>
					<Field
						name={`content.${index}.label`}
						placeholder="Enter description"
						autoFocus
					/>
					<label htmlFor="description">
						What will students be able to do at the end of this section?
					</label>
					<Field
						name={`content.${index}.data`}
						placeholder="Enter description"
						autoFocus
					/>

					<div className="flex justify-content-end gap-2 mt-2">
						<Button
							type="button"
							label="Cancel"
							className="cancel"
							onClick={(e) => {
								e.preventDefault();
								setOpenEditMode(false);
							}}
						/>
						<Button
							type="button"
							label="Save"
							onClick={(e) => {
								e.preventDefault();
								setOpenEditMode(false);
							}}
						/>
					</div>
				</fieldset>
			</div>
		);

	return (
		<>
			<details
				className="accordion-tab"
				open={false}
				onToggle={() => setIsOpen(!isOpen)}
				draggable
				onDragStart={(e) => handleDragStart(e, index, "parent")}
				onDragEnd={handleDragEnd}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={(e) => handleDrop(e, index, "parent")}
			>
				<summary>
					<section className="flex align-items-center">
						<i className="pi pi-bars mr-3" />
						{isOpen ? (
							<i className="pi pi-angle-right mr-3" />
						) : (
							<i className="pi pi-angle-down mr-3" />
						)}

						<h4 className="mr-3">Section {index}</h4>
						<span className="mr-2">{content.label}</span>
						<i
							className={classNames(["pi pi-pencil", "edit-icon"])}
							onClick={(e) => {
								e.preventDefault();
								setOpenEditMode(true);
							}}
						/>
					</section>

					<i
						className="pi pi-trash mr-2"
						onClick={(e) => {
							e.preventDefault();
							arrayHelpers.remove(index);
						}}
					/>
				</summary>

				<FieldArray
					name={`content.${index}.children`}
					render={(arrayHelpers) => (
						<UploadLectureItem
							index={index}
							arrayHelpers={arrayHelpers}
							children={content.children}
						/>
					)}
				/>
			</details>
			<UploadLectureDivider arrayHelpers={arrayHelpers} index={index + 1} />
		</>
	);
};

export default UploadLectureSection;
