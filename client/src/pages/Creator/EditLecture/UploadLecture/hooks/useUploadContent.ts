import { FormikProps } from "formik";
import { useOutletContext } from "react-router";
import { CreatedLectureModel } from "../../../../../data/models/createdLecture.model";

const useDragAndDropContent = () => {
	const formik = useOutletContext<FormikProps<CreatedLectureModel>>();

	const handleDragStart = (e, index: number, plain: string) => {
		e.dataTransfer.setData(`text/${plain}`, index);
		e.currentTarget.classList.add("dragging");
	};

	const handleDragEnd = (e) => {
		e.currentTarget.classList.remove("dragging");
	};

	const handleDrop = (e, index: number, plain: string, subIndex?: number) => {
		e.preventDefault();

		const draggableIndex = e.dataTransfer.getData(`text/${plain}`);
		if (typeof subIndex === "undefined" && draggableIndex !== index) {
			const newItems = [...formik.values.content];
			const [removed] = newItems.splice(draggableIndex, 1);
			newItems.splice(index, 0, removed);
			formik.setFieldValue("content", newItems);
		}

		if (typeof subIndex !== "undefined" && draggableIndex !== subIndex) {
			const newItems = [...formik.values.content];
			const [removed] = newItems[index].children.splice(draggableIndex, 1);
			newItems[index].children.splice(subIndex, 0, removed);
			formik.setFieldValue("content", newItems);
		}
		e.currentTarget.classList.remove("dragging-over");
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.currentTarget.classList.add("dragging-over");
	};

	const handleDragLeave = (e) => {
		e.currentTarget.classList.remove("dragging-over");
	};

	return {
		formik,
		handleDragStart,
		handleDragEnd,
		handleDragOver,
		handleDragLeave,
		handleDrop,
	};
};

export default useDragAndDropContent;
