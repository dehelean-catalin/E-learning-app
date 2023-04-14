import { useFormikContext } from "formik";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { CreatedLectureModel } from "../../../../../../../shared/src/createdLecture.model";
import "./EditLectureHeader.scss";

const EditLectureHeader = () => {
	const { submitForm, values } = useFormikContext<CreatedLectureModel>();

	return (
		<header className="edit-lecture-header">
			<NavLink to="/creator/created-lectures" className="back-to-link" replace>
				<i className="pi pi-chevron-left" /> Back to lectures
			</NavLink>
			<div className="page-number">{values.publish.title}</div>
			<Button
				label="Save"
				className="save-button"
				type="button"
				onClick={submitForm}
			/>
		</header>
	);
};

export default EditLectureHeader;
